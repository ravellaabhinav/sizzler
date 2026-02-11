"use client";

import * as React from "react";
import { menu, type Category, type MenuItem, categories } from "@/data/menu";
import CategoryTabs from "@/components/CategoryTabs";
import DishCard from "@/components/DishCard";
import DishModal from "@/components/DishModal";
import MyTableButton from "@/components/MyTableButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";

type SortKey = "recommended" | "price_asc" | "price_desc" | "name_asc";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

// export default function MenuPage() {
//   // ✅ Your CategoryTabs expects Category[] so we use categories as Category[]
//   const [active, setActive] = React.useState<Category>(
//     (categories?.[0] as Category) ?? "Appetizers"
//   );

export default function MenuPage() {
  const [active, setActive] = React.useState<Category>(
    categories?.[0]?.key ?? "Appetizers"
  );
    // Search / filter / sort
  const [query, setQuery] = React.useState("");
  const [onlyVeg, setOnlyVeg] = React.useState(false);
  const [onlyPopular, setOnlyPopular] = React.useState(false);
  const [onlySpicy, setOnlySpicy] = React.useState(false);
  const [sort, setSort] = React.useState<SortKey>("recommended");

  // Modal
  const [selected, setSelected] = React.useState<MenuItem | null>(null);
  const modalOpen = selected !== null;

  const filtered = React.useMemo(() => {
    const q = normalize(query);

    let items = menu.filter((m) => m.category === active);

    if (onlyVeg) items = items.filter((m) => !!m.vegetarian);
    if (onlyPopular) items = items.filter((m) => !!m.popular);
    if (onlySpicy) items = items.filter((m) => !!m.spicy);

    if (q.length > 0) {
      items = items.filter((m) => {
        const hay = `${m.name} ${m.description ?? ""}`.toLowerCase();
        return hay.includes(q);
      });
    }

    const out = [...items];
    switch (sort) {
      case "price_asc":
        out.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        out.sort((a, b) => b.price - a.price);
        break;
      case "name_asc":
        out.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "recommended":
      default:
        out.sort((a, b) => {
          const ap = a.popular ? 1 : 0;
          const bp = b.popular ? 1 : 0;
          if (bp !== ap) return bp - ap; // popular first
          return a.name.localeCompare(b.name);
        });
        break;
    }

    return out;
  }, [active, query, onlyVeg, onlyPopular, onlySpicy, sort]);

  const hasAny =
    query.trim().length > 0 ||
    onlyVeg ||
    onlyPopular ||
    onlySpicy ||
    sort !== "recommended";

  return (
    <div className="container-pad page-under-header pb-24">
      {/* Title */}
      <div className="mb-4">
        <h1 className="font-serif text-3xl md:text-4xl">Menu</h1>
        <p className="mt-1 text-sm text-cream/75">
          Build your order with{" "}
          <span className="font-semibold text-cream">My Table</span>, then show
          it to our waiter—no checkout.
        </p>
      </div>

      {/* ✅ Category tabs (matches your component types) */}
      <CategoryTabs categories={categories} active={active} onChange={setActive} />

      {/* Search / sort / filters */}
      <div className="mt-4 space-y-3 rounded-2xl border border-cream/10 bg-cream/5 p-3 shadow-soft">
        {/* Search + sort row */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes (e.g., butter chicken, naan, biryani)"
              className={cn(
                "w-full rounded-xl border border-cream/15 bg-maroon-900/40 px-4 py-3",
                "text-sm text-cream placeholder:text-cream/50",
                "focus:outline-none focus:ring-2 focus:ring-gold-500/50"
              )}
              aria-label="Search menu"
            />
            {query.length > 0 ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-cream/70 hover:bg-cream/10 hover:text-cream"
                aria-label="Clear search"
              >
                Clear
              </button>
            ) : null}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className={cn(
              "h-[46px] rounded-xl border border-cream/15 bg-maroon-900/40 px-3",
              "text-sm font-semibold text-cream",
              "focus:outline-none focus:ring-2 focus:ring-gold-500/50"
            )}
            aria-label="Sort menu"
          >
            <option value="recommended">Recommended</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="name_asc">Name: A → Z</option>
          </select>
        </div>

        {/* Filter chips row */}
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip label="Veg" active={onlyVeg} onClick={() => setOnlyVeg((v) => !v)} />
          <FilterChip label="Popular" active={onlyPopular} onClick={() => setOnlyPopular((v) => !v)} />
          <FilterChip label="Spicy" active={onlySpicy} onClick={() => setOnlySpicy((v) => !v)} />

          {hasAny ? (
            <button
              type="button"
              className="ml-auto rounded-xl border border-cream/15 bg-maroon-900/40 px-3 py-2 text-xs font-semibold text-cream/80 hover:bg-maroon-900/55 hover:text-cream"
              onClick={() => {
                setQuery("");
                setOnlyVeg(false);
                setOnlyPopular(false);
                setOnlySpicy(false);
                setSort("recommended");
              }}
            >
              Reset
            </button>
          ) : null}
        </div>
      </div>

      {/* Results */}
      <div className="mt-4 grid gap-4">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-cream/10 bg-cream/5 p-6 text-center">
            <div className="text-lg font-semibold">No matches</div>
            <p className="mt-1 text-cream/75">
              Try a different search or clear filters.
            </p>
            <div className="mt-4 flex justify-center">
              <Button
                variant="secondary"
                onClick={() => {
                  setQuery("");
                  setOnlyVeg(false);
                  setOnlyPopular(false);
                  setOnlySpicy(false);
                  setSort("recommended");
                }}
              >
                Clear filters
              </Button>
            </div>
          </div>
        ) : (
          filtered.map((dish) => (
            <DishCard key={dish.id} dish={dish} onOpen={() => setSelected(dish)} />
          ))
        )}
      </div>

      {/* Floating button */}
      <MyTableButton />

      {/* ✅ DishModal props fixed: uses onOpenChange */}
      <DishModal
        dish={selected}
        open={modalOpen}
        onOpenChange={(o) => {
          if (!o) setSelected(null);
        }}
      />
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-2 text-xs font-extrabold uppercase tracking-wide border shadow-sm",
        active
          ? "border-gold-500/40 bg-gold-500 text-ink"
          : "border-cream/15 bg-maroon-900/40 text-cream/80 hover:bg-maroon-900/55 hover:text-cream"
      )}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
