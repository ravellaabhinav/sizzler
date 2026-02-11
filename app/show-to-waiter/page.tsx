"use client";

import * as React from "react";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";
import { readMyTable, totalPrice, type MyTableState } from "@/lib/myTable";
import { Button } from "@/components/ui/button";

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

const EMPTY_STATE: MyTableState = {
  lines: [],
  notes: "",
  updatedAt: new Date(0).toISOString(),
};

export default function ShowToWaiterPage() {
  const [mounted, setMounted] = React.useState(false);
  const [state, setState] = React.useState<MyTableState>(EMPTY_STATE);

  React.useEffect(() => {
    setMounted(true);
    setState(readMyTable());
    const t = window.setInterval(() => setState(readMyTable()), 800);
    return () => window.clearInterval(t);
  }, []);

  if (!mounted) return null;

  const ts = new Date(state.updatedAt || new Date().toISOString());
  const total = totalPrice(state);
  const qrValue = "https://sizzlerofindiatn.com"; // visual only

  return (
    <div className="min-h-screen bg-maroon-950 text-cream">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-cream/10 bg-cream/5">
              <Image src="/images/hero-sizzler.png" alt="Sizzler logo" fill className="object-cover" />
            </div>
            <div>
              <div className="font-serif text-xl leading-none">Sizzler Cuisine of India</div>
              <div className="text-xs text-cream/70">Show this screen to your waiter</div>
            </div>
          </div>
          <div className="hidden sm:block">
            <Button variant="secondary" onClick={() => window.print()}>
              Print
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-cream/10 bg-cream/5 p-4 shadow-soft">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-sm text-cream/70">Timestamp</div>
              <div className="text-base font-semibold">
                {ts.toLocaleString([], {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-cream/70">Total (display only)</div>
              <div className="text-2xl font-semibold text-gold-400">{money(total)}</div>
            </div>
          </div>

          <div className="mt-5 border-t border-cream/10 pt-4">
            {state.lines.length === 0 ? (
              <div className="text-center text-cream/80">
                No items yet. Please add items from the menu.
              </div>
            ) : (
              <div className="space-y-3">
                {state.lines.map((l) => (
                  <div
                    key={l.id}
                    className="flex items-center justify-between rounded-2xl border border-cream/10 bg-maroon-900/40 px-4 py-3"
                  >
                    <div className="text-lg font-semibold">{l.name}</div>
                    <div className="text-2xl font-bold text-cream">× {l.qty}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="rounded-2xl border border-cream/10 bg-maroon-900/40 p-4">
              <div className="text-sm font-semibold text-cream/80">Special notes</div>
              <div className="mt-1 whitespace-pre-wrap text-lg">{state.notes || "—"}</div>
            </div>

            <div className="flex justify-center sm:justify-end">
              <div className="rounded-2xl border border-cream/10 bg-cream/5 p-3">
                <div className="text-center text-xs text-cream/70">Scan (info)</div>
                <div className="mt-2">
                  <QRCodeCanvas value={qrValue} size={128} includeMargin />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:hidden">
            <Button variant="secondary" onClick={() => window.print()}>
              Print
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-cream/70">
          Tip: Turn up your screen brightness for easier reading.
        </div>
      </div>
    </div>
  );
}
