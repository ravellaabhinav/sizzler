"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { MenuItem } from "@/data/menu";
import { addItem, readMyTable, setQty } from "@/lib/myTable";
import { cn } from "@/components/ui/cn";

function getQty(dishId: string): number {
  try {
    const state = readMyTable();
    const line = state?.lines?.find((l: any) => l.id === dishId);
    return line?.qty ?? 0;
  } catch {
    return 0;
  }
}

export default function DishCard({
  dish,
  onOpen,
}: {
  dish: MenuItem;
  onOpen: () => void;
}) {
  const [mounted, setMounted] = React.useState(false);
  const [qty, setQtyState] = React.useState(0);
  const [flashAdded, setFlashAdded] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    const sync = () => setQtyState(getQty(dish.id));
    sync();

    const t = window.setInterval(sync, 600);
    window.addEventListener("storage", sync);

    return () => {
      window.clearInterval(t);
      window.removeEventListener("storage", sync);
    };
  }, [dish.id]);

  const flashGreen = () => {
    setFlashAdded(true);
    window.setTimeout(() => setFlashAdded(false), 350);
  };

  const handleAddOne = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(dish, 1);
    setQtyState(getQty(dish.id));
    flashGreen();
  };

  const handleMinusOne = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const next = Math.max(0, qty - 1);
    setQty(dish.id, next);
    setQtyState(next);
  };

  const handlePlusOne = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const next = qty + 1;
    setQty(dish.id, next);
    setQtyState(next);
    flashGreen();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="rounded-2xl border border-cream/10 bg-cream/5 p-3 shadow-soft"
    >
      <button
        onClick={onOpen}
        className="w-full text-left"
        type="button"
        aria-label={`View ${dish.name}`}
      >
        <div className="relative mb-3 overflow-hidden rounded-xl border border-cream/10">
          <Image
            src={dish.image}
            alt={dish.name}
            width={800}
            height={500}
            className="h-40 w-full object-cover"
          />

          {/* Tags */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {dish.popular ? (
              <span className="inline-flex items-center rounded-full bg-gold-500 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-ink shadow-md">
                Popular
              </span>
            ) : null}

            {dish.vegetarian ? (
              <span className="inline-flex items-center rounded-full bg-emerald-700 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-md">
                Veg
              </span>
            ) : null}

            {dish.spicy ? (
              <span className="inline-flex items-center rounded-full bg-rose-600 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-md">
                Spicy
              </span>
            ) : null}
          </div>

          {/* Qty badge */}
          {mounted && qty > 0 ? (
            <div className="absolute bottom-3 right-3">
              <span className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-[12px] font-extrabold text-white shadow-md">
                Qty {qty}
              </span>
            </div>
          ) : null}
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate font-semibold">{dish.name}</div>
            <div className="mt-1 line-clamp-2 text-sm text-cream/75">
              {dish.description}
            </div>

            {mounted && qty > 0 ? (
              <div className="mt-1 text-xs font-semibold text-emerald-300/90">
                In My Table: {qty}
              </div>
            ) : null}
          </div>

          <div className="shrink-0 rounded-xl bg-gold-500/10 px-2 py-1 text-sm font-semibold text-gold-400">
            ${dish.price.toFixed(2)}
          </div>
        </div>
      </button>

      {/* CTA / Stepper */}
      <div className="mt-3">
        {!mounted || qty === 0 ? (
          <button
            type="button"
            onClick={handleAddOne}
            className={cn(
              "w-full rounded-2xl px-4 py-3 font-semibold",
              "bg-gold-500 text-ink shadow-soft",
              "transition-colors duration-300 hover:bg-gold-400 active:bg-gold-600",
              flashAdded ? "bg-emerald-600 text-white hover:bg-emerald-600" : ""
            )}
            aria-label={`Add ${dish.name} to My Table`}
          >
            Add to My Table
          </button>
        ) : (
          <div
            className={cn(
              "flex w-full items-center justify-between rounded-2xl px-3 py-2",
              "border border-cream/10 bg-gold-500/10 shadow-soft",
              flashAdded ? "ring-2 ring-emerald-500/50" : ""
            )}
          >
            <button
              type="button"
              onClick={handleMinusOne}
              className={cn(
                "grid h-11 w-11 place-items-center rounded-xl",
                "bg-cream/10 text-cream",
                "hover:bg-cream/15 active:bg-cream/20",
                "focus:outline-none focus:ring-2 focus:ring-gold-500/50"
              )}
              aria-label={`Decrease ${dish.name} quantity`}
            >
              <span className="text-xl leading-none">−</span>
            </button>

            <div className="flex flex-col items-center px-2">
              <div className="text-xs font-semibold uppercase tracking-wide text-cream/70">
                Qty
              </div>
              <div className="text-xl font-extrabold text-cream">{qty}</div>
            </div>

            <button
              type="button"
              onClick={handlePlusOne}
              className={cn(
                "grid h-11 w-11 place-items-center rounded-xl",
                "bg-cream/10 text-cream",
                "hover:bg-cream/15 active:bg-cream/20",
                "focus:outline-none focus:ring-2 focus:ring-gold-500/50"
              )}
              aria-label={`Increase ${dish.name} quantity`}
            >
              <span className="text-xl leading-none">+</span>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
