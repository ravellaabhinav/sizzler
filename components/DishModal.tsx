"use client";

import * as React from "react";
import Image from "next/image";
import type { MenuItem } from "@/data/menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { addItem } from "@/lib/myTable";

export default function DishModal({
  dish,
  open,
  onOpenChange,
}: {
  dish: MenuItem | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [qty, setQty] = React.useState(1);

  React.useEffect(() => {
    if (open) setQty(1);
  }, [open]);

  if (!dish) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent titleId="dish-title">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="dish-title" className="font-serif text-2xl">{dish.name}</h2>
            <div className="mt-1 text-sm text-cream/75">{dish.description}</div>
          </div>
          <div className="rounded-xl bg-gold-500/10 px-3 py-2 text-sm font-semibold text-gold-400">
            ${dish.price.toFixed(2)}
          </div>
        </div>

        <div className="mt-4 relative overflow-hidden rounded-2xl border border-cream/10">
          <Image src={dish.image} alt={dish.name} width={1200} height={700} className="h-56 w-full object-cover" />
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-cream/15 bg-maroon-900/40 p-1">
            <button
              className="h-11 w-11 rounded-xl bg-cream/10 text-xl font-bold hover:bg-cream/15"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              type="button"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <div className="min-w-10 text-center text-base font-semibold">{qty}</div>
            <button
              className="h-11 w-11 rounded-xl bg-cream/10 text-xl font-bold hover:bg-cream/15"
              onClick={() => setQty((q) => q + 1)}
              type="button"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <Button
            className="flex-1"
            size="lg"
            onClick={() => {
              addItem(dish, qty);
              onOpenChange(false);
            }}
          >
            Add to My Table
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
