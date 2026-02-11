"use client";

import Link from "next/link";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "./ui/cn";
import {
  Home,
  UtensilsCrossed,
  Table2,
  PhoneCall,
  MapPin,
  AlertTriangle,
  X,
} from "lucide-react";

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [allergenOpen, setAllergenOpen] = React.useState(false);

  // ESC closes modal first, then drawer
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (allergenOpen) setAllergenOpen(false);
      else setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [allergenOpen]);

  // Prevent scroll when drawer OR modal open
  React.useEffect(() => {
    if (!open && !allergenOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, allergenOpen]);

  const openAllergen = () => {
    // Close drawer first, then open popup
    setOpen(false);
    window.setTimeout(() => setAllergenOpen(true), 120);
  };

  return (
    <>
      {/* FULL-WIDTH glass header */}
      <header className="absolute inset-x-0 top-0 z-[70]">
        <div className="mx-auto w-full">
          <div className="container-pad pt-4">
            <div
              className={cn(
                "w-full rounded-2xl border border-white/15",
                "bg-white/10 backdrop-blur-xl",
                "shadow-soft"
              )}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <Link
                  href="/"
                  className="flex items-center gap-3"
                  aria-label="Go to homepage"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-black/20">
                    <span className="font-serif text-xl font-bold text-gold-400">
                      S
                    </span>
                  </div>

                  <div className="leading-tight">
                    <div className="font-serif text-[16px] font-extrabold tracking-wide text-white">
                      Sizzler
                    </div>
                    <div className="text-[12px] font-semibold text-white/75">
                      Cuisine of India
                    </div>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-xl",
                    "border border-white/20 bg-black/20 text-white",
                    "hover:bg-black/30 active:bg-black/40",
                    "focus:outline-none focus:ring-2 focus:ring-gold-500/60"
                  )}
                  aria-label="Open menu"
                >
                  <span className="text-[18px] leading-none">☰</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              className="fixed inset-0 z-[80] bg-black/65"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              className="fixed right-0 top-0 z-[90] h-full w-[86%] max-w-sm border-l border-white/10 bg-maroon-950/95 backdrop-blur-xl"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ duration: 0.18 }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <div className="font-serif text-2xl font-extrabold text-white">
                    Quick Links
                  </div>
                  <div className="text-xs font-semibold text-white/70">
                    Sizzler Cuisine of India
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-xl",
                    "border border-white/15 bg-white/10 text-white",
                    "hover:bg-white/15 active:bg-white/20"
                  )}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="grid gap-3 px-5 py-5">
                <NavLink
                  href="/"
                  onClick={() => setOpen(false)}
                  icon={<Home className="h-5 w-5" />}
                  label="Home"
                />
                <NavLink
                  href="/menu"
                  onClick={() => setOpen(false)}
                  icon={<UtensilsCrossed className="h-5 w-5" />}
                  label="Browse Menu"
                />
                <NavLink
                  href="/my-table"
                  onClick={() => setOpen(false)}
                  icon={<Table2 className="h-5 w-5" />}
                  label="My Table"
                />

                <a
                  href="tel:+17313007757"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl bg-gold-500 px-4 py-4",
                    "text-base font-extrabold text-ink shadow-soft"
                  )}
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-black/10">
                    <PhoneCall className="h-5 w-5" />
                  </div>
                  Call Restaurant
                </a>

                <div className="mt-2 rounded-2xl border border-cream/10 bg-cream/5 p-4 text-sm text-cream/80">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cream/15 bg-maroon-900/40 text-cream">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-base font-bold text-cream">
                        581 Old Hickory Blvd, Suite K
                      </div>
                      <div className="mt-1">Jackson, TN 38305</div>
                      <div className="mt-2 text-cream/70">
                        Phone:{" "}
                        <a
                          className="font-semibold text-gold-400"
                          href="tel:+17313007757"
                        >
                          (731) 300-7757
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Allergen button */}
                  <button
                    type="button"
                    onClick={openAllergen}
                    className={cn(
                      "mt-4 flex w-full items-center gap-2 rounded-xl px-3 py-3",
                      "border border-amber-400/25 bg-amber-400/10 text-amber-200",
                      "hover:bg-amber-400/15 active:bg-amber-400/20",
                      "focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                    )}
                    aria-label="Open allergen information"
                  >
                    <AlertTriangle className="h-5 w-5" />
                    <span className="text-sm font-extrabold tracking-wide">
                      Allergen Information
                    </span>
                  </button>
                </div>
              </nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      {/* ✅ SMALL ALLERGEN POPUP (Bottom sheet on mobile, centered on desktop) */}
      {/* ✅ SMALL ALLERGEN POPUP (100% stable positioning) */}
<AnimatePresence>
  {allergenOpen ? (
    <>
      <motion.div
        className="fixed inset-0 z-[110] bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setAllergenOpen(false)}
      />

      <motion.div
        className={cn(
          "fixed z-[120] inset-x-0 px-4",                 // ✅ always full-width space to center within
          "bottom-4",                                     // ✅ mobile bottom-sheet
          "md:bottom-auto md:top-20",                     // ✅ desktop: near top (below header), not clipped
          "pointer-events-none"                           // ✅ clicks go only to the card, not the wrapper
        )}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 14 }}
        transition={{ duration: 0.18 }}
      >
        {/* the actual card */}
        <div
          className={cn(
            "pointer-events-auto mx-auto w-full max-w-lg", // ✅ centered with mx-auto, no transforms
            "rounded-3xl border border-cream/10 bg-maroon-950/95 shadow-soft backdrop-blur-xl"
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Allergen information"
        >
          <div className="flex items-start justify-between gap-3 border-b border-cream/10 px-5 py-4">
            <div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-300" />
                <div className="font-serif text-xl font-extrabold text-cream">
                  Allergen Info
                </div>
              </div>
              <div className="mt-1 text-sm text-cream/70">
                Tell staff about allergies before ordering.
              </div>
            </div>

            <button
              type="button"
              onClick={() => setAllergenOpen(false)}
              className={cn(
                "grid h-10 w-10 place-items-center rounded-xl",
                "border border-cream/15 bg-cream/5 text-cream/80",
                "hover:bg-cream/10 hover:text-cream"
              )}
              aria-label="Close allergen information"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Keep it small: no scroll needed */}
          <div className="px-5 py-4 text-sm text-cream/80">
            <div className="rounded-2xl border border-cream/10 bg-cream/5 p-4">
              <div className="font-semibold text-cream">Cross-contact notice</div>
              <div className="mt-1">
                Shared equipment is used. We can’t guarantee any dish is completely allergen-free.
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-cream/10 bg-cream/5 p-4">
              <div className="font-semibold text-cream">Major U.S. allergens</div>
              <div className="mt-1">
                Milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, soy, sesame.
              </div>
            </div>

            <div className="mt-3 flex items-center justify-end gap-2">
              <a
                href="tel:+17313007757"
                className="rounded-xl border border-cream/15 bg-cream/5 px-4 py-2 text-sm font-semibold text-cream/85 hover:bg-cream/10 hover:text-cream"
              >
                Call to Ask
              </a>
              <button
                type="button"
                onClick={() => setAllergenOpen(false)}
                className="rounded-xl bg-gold-500 px-4 py-2 text-sm font-extrabold text-ink"
              >
                OK
              </button>
            </div>

            <div className="mt-3 text-[11px] leading-relaxed text-cream/55">
              If you have a severe allergy, please speak with staff before ordering.
            </div>
          </div>
        </div>
      </motion.div>
    </>
  ) : null}
</AnimatePresence>

    </>
  );
}

function NavLink({
  href,
  label,
  icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-cream/10 bg-cream/5 px-4 py-4",
        "text-base font-semibold text-cream shadow-soft",
        "hover:bg-cream/10"
      )}
    >
      <div className="grid h-10 w-10 place-items-center rounded-xl border border-cream/15 bg-maroon-900/40 text-cream/90">
        {icon}
      </div>
      {label}
    </Link>
  );
}
