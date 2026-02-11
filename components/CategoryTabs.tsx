"use client";

import * as React from "react";
import type { Category } from "@/data/menu";
import { cn } from "@/components/ui/cn";

export type CategoryTab = { key: Category; label: string };

export default function CategoryTabs({
  categories,
  active,
  onChange,
}: {
  categories: CategoryTab[];
  active: Category;
  onChange: (c: Category) => void;
}) {
  return (
    <div className="mt-4 rounded-2xl border border-cream/10 bg-cream/5 p-2 shadow-soft">
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {categories.map((c) => {
          const isActive = c.key === active;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => onChange(c.key)}
              className={cn(
                "shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition",
                isActive
                  ? "bg-gold-500 text-ink shadow"
                  : "bg-maroon-900/40 text-cream/80 hover:bg-maroon-900/55 hover:text-cream"
              )}
              aria-pressed={isActive}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
