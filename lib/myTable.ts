"use client";

import type { MenuItem } from "@/data/menu";

export type MyTableLine = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

export type MyTableState = {
  lines: MyTableLine[];
  notes: string;
  updatedAt: string; // ISO
};

const KEY = "sizzler.myTable.v1";

function safeParse(json: string | null): MyTableState | null {
  if (!json) return null;
  try {
    const parsed = JSON.parse(json) as MyTableState;
    if (!parsed || !Array.isArray(parsed.lines)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function readMyTable(): MyTableState {
  if (typeof window === "undefined") return { lines: [], notes: "", updatedAt: new Date().toISOString() };
  const parsed = safeParse(window.localStorage.getItem(KEY));
  return parsed ?? { lines: [], notes: "", updatedAt: new Date().toISOString() };
}

export function writeMyTable(state: MyTableState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

export function clearMyTable() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

export function addItem(item: MenuItem, qty: number) {
  const current = readMyTable();
  const existing = current.lines.find((l) => l.id === item.id);
  const nextLines = existing
    ? current.lines.map((l) => (l.id === item.id ? { ...l, qty: l.qty + qty } : l))
    : [
        ...current.lines,
        { id: item.id, name: item.name, price: item.price, image: item.image, qty },
      ];
  writeMyTable({ ...current, lines: nextLines, updatedAt: new Date().toISOString() });
}

export function setQty(id: string, qty: number) {
  const current = readMyTable();
  const nextLines = current.lines
    .map((l) => (l.id === id ? { ...l, qty } : l))
    .filter((l) => l.qty > 0);
  writeMyTable({ ...current, lines: nextLines, updatedAt: new Date().toISOString() });
}

export function removeItem(id: string) {
  const current = readMyTable();
  const nextLines = current.lines.filter((l) => l.id !== id);
  writeMyTable({ ...current, lines: nextLines, updatedAt: new Date().toISOString() });
}

export function setNotes(notes: string) {
  const current = readMyTable();
  writeMyTable({ ...current, notes, updatedAt: new Date().toISOString() });
}

export function totalCount(state: MyTableState) {
  return state.lines.reduce((sum, l) => sum + l.qty, 0);
}

export function totalPrice(state: MyTableState) {
  return state.lines.reduce((sum, l) => sum + l.qty * l.price, 0);
}
