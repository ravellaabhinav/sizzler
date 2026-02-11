"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  readMyTable,
  setQty,
  removeItem,
  setNotes,
  totalPrice,
  totalCount,
  type MyTableState,
} from "@/lib/myTable";
import MyTableButton from "@/components/MyTableButton";

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

const EMPTY_STATE: MyTableState = {
  lines: [],
  notes: "",
  updatedAt: new Date(0).toISOString(),
};

export default function MyTablePage() {
  const [mounted, setMounted] = React.useState(false);
  const [state, setState] = React.useState<MyTableState>(EMPTY_STATE);

  React.useEffect(() => {
    setMounted(true);
    setState(readMyTable());

    const sync = () => setState(readMyTable());
    window.addEventListener("storage", sync);
    const t = window.setInterval(sync, 800);

    return () => {
      window.removeEventListener("storage", sync);
      window.clearInterval(t);
    };
  }, []);

  // ✅ Prevent hydration mismatch: server & first client render match
  if (!mounted) {
    return (
      <div className="container-pad page-under-header pb-28">
        <div className="rounded-3xl border border-cream/10 bg-cream/5 p-6 text-center">
          <div className="text-lg font-semibold">Loading your table…</div>
          <p className="mt-1 text-cream/75">One moment.</p>
        </div>
      </div>
    );
  }

  const count = totalCount(state);
  const total = totalPrice(state);

  const handleClear = () => {
    const ok = window.confirm("Clear all items from My Table?");
    if (!ok) return;

    // Clear by setting every item qty to 0
    state.lines.forEach((l) => setQty(l.id, 0));
    setNotes("");
    setState(readMyTable());
  };

  return (
    <div className="container-pad page-under-header pb-28">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">My Table</h1>
          <p className="mt-1 text-sm text-cream/75">
            Review your items and show them to our waiter when you&apos;re ready.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          {/* ✅ Clear button */}
          {count > 0 ? (
            <Button variant="secondary" onClick={handleClear}>
              Clear
            </Button>
          ) : null}

          <Link href="/menu">
            <Button variant="secondary">Back to Menu</Button>
          </Link>
        </div>
      </div>

      {/* Mobile actions */}
      <div className="mb-4 flex gap-2 sm:hidden">
        <Link href="/menu" className="flex-1">
          <Button variant="secondary" className="w-full">
            Back to Menu
          </Button>
        </Link>
        {count > 0 ? (
          <Button variant="secondary" className="shrink-0" onClick={handleClear}>
            Clear
          </Button>
        ) : null}
      </div>

      {count === 0 ? (
        <div className="rounded-3xl border border-cream/10 bg-cream/5 p-6 text-center">
          <div className="text-lg font-semibold">Your table is empty</div>
          <p className="mt-1 text-cream/75">
            Add dishes from the menu to build your order.
          </p>
          <div className="mt-4 flex justify-center">
            <Link href="/menu">
              <Button size="lg">Browse Menu</Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {state.lines.map((line) => (
              <div
                key={line.id}
                className="flex gap-3 rounded-2xl border border-cream/10 bg-cream/5 p-3 shadow-soft"
              >
                <div className="relative h-16 w-20 overflow-hidden rounded-xl border border-cream/10">
                  <Image
                    src={line.image}
                    alt={line.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate font-semibold">{line.name}</div>
                      <div className="text-sm text-cream/70">
                        {money(line.price)} each
                      </div>
                    </div>

                    <button
                      className="rounded-lg px-2 py-1 text-sm font-semibold text-cream/70 hover:bg-cream/10 hover:text-cream"
                      onClick={() => {
                        removeItem(line.id);
                        setState(readMyTable());
                      }}
                      type="button"
                      aria-label={`Remove ${line.name}`}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-xl border border-cream/15 bg-maroon-900/40 p-1">
                      <button
                        className="h-9 w-9 rounded-lg bg-cream/10 text-lg font-bold hover:bg-cream/15"
                        onClick={() => {
                          setQty(line.id, Math.max(0, line.qty - 1));
                          setState(readMyTable());
                        }}
                        type="button"
                        aria-label={`Decrease ${line.name}`}
                      >
                        −
                      </button>
                      <div className="min-w-10 text-center text-sm font-semibold">
                        {line.qty}
                      </div>
                      <button
                        className="h-9 w-9 rounded-lg bg-cream/10 text-lg font-bold hover:bg-cream/15"
                        onClick={() => {
                          setQty(line.id, line.qty + 1);
                          setState(readMyTable());
                        }}
                        type="button"
                        aria-label={`Increase ${line.name}`}
                      >
                        +
                      </button>
                    </div>

                    <div className="text-sm font-semibold text-gold-400">
                      {money(line.qty * line.price)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-cream/10 bg-cream/5 p-4 shadow-soft">
            <div className="mb-2 text-sm font-semibold text-cream/80">
              Special instructions
            </div>

            <Textarea
              value={state.notes}
              placeholder="E.g., less spicy, no onions, extra mint sauce…"
              onChange={(e) => {
                setNotes(e.target.value);
                setState(readMyTable());
              }}
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm text-cream/70">Total (display only)</div>
                <div className="text-2xl font-semibold text-cream">
                  {money(total)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* ✅ Clear button near checkout area (desktop & mobile) */}
                <Button variant="secondary" onClick={handleClear}>
                  Clear
                </Button>

                <Link href="/show-to-waiter">
                  <Button size="lg">Show This to Our Waiter</Button>
                </Link>
              </div>
            </div>
          </div>

          <MyTableButton />
        </>
      )}
    </div>
  );
}
