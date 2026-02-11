"use client";

import * as React from "react";
import { cn } from "./cn";
import { motion, AnimatePresence } from "framer-motion";

type SheetContextValue = { open: boolean; setOpen: (v: boolean) => void };
const SheetContext = React.createContext<SheetContextValue | null>(null);

export function Sheet({
  open: openProp,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  children: React.ReactNode;
}) {
  const [uncontrolled, setUncontrolled] = React.useState(false);
  const open = openProp ?? uncontrolled;

  const setOpen = (v: boolean) => {
    if (openProp === undefined) setUncontrolled(v);
    onOpenChange?.(v);
  };

  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(SheetContext);
  if (!ctx) throw new Error("SheetTrigger must be used within Sheet");
  return (
    <span
      onClick={() => ctx.setOpen(true)}
      role="button"
      tabIndex={0}
      className="inline-flex"
      onKeyDown={(e) => (e.key === "Enter" ? ctx.setOpen(true) : null)}
    >
      {children}
    </span>
  );
}

export function SheetContent({
  className,
  children,
  titleId = "sheet-title",
}: {
  className?: string;
  children: React.ReactNode;
  titleId?: string;
}) {
  const ctx = React.useContext(SheetContext);
  if (!ctx) throw new Error("SheetContent must be used within Sheet");

  React.useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") ctx.setOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [ctx]);

  return (
    <AnimatePresence>
      {ctx.open ? (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => ctx.setOpen(false)}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={cn(
              "fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-hidden rounded-t-3xl border border-cream/10 bg-maroon-900/95 backdrop-blur",
              className
            )}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="mx-auto mt-3 h-1.5 w-10 rounded-full bg-cream/25" />
            <div className="max-h-[90vh] overflow-auto px-4 pb-6 pt-4">
              {children}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export function SheetClose({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(SheetContext);
  if (!ctx) throw new Error("SheetClose must be used within Sheet");
  return (
    <span
      onClick={() => ctx.setOpen(false)}
      role="button"
      tabIndex={0}
      className="inline-flex"
      onKeyDown={(e) => (e.key === "Enter" ? ctx.setOpen(false) : null)}
    >
      {children}
    </span>
  );
}
