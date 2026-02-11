// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { favorites } from "@/data/menu";

function ScrollIndicator() {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) setVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
      <div className="flex flex-col items-center gap-1">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-white/60">
          Scroll
        </span>
        <span className="animate-scroll-bounce text-2xl leading-none text-white/85">
          ↓
        </span>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="pb-24">
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/hero-sizzler.png"
          alt="Sizzler Cuisine of India featured dishes"
          fill
          priority
          className="object-cover"
        />

        {/* Overlays MUST NOT steal clicks */}
        <div className="pointer-events-none absolute inset-0 bg-black/45" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Hero content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container-pad pb-14">
            <h1 className="font-serif text-4xl leading-tight tracking-tight text-white md:text-5xl">
              Authentic
              <br />
              Indian Cuisine,
              <br />
              Served Sizzling
              <br />
              Hot
            </h1>

            <p className="mt-4 max-w-md text-base text-white/80">
              Experience the rich flavors and aromas of traditional Indian
              cuisine at Sizzler Cuisine of India.
            </p>

            <div className="mt-6">
              <Link href="/menu">
                <Button size="lg" className="rounded-2xl px-6">
                  Browse Menu <span className="ml-2">→</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Professional scroll indicator */}
        <ScrollIndicator />
      </section>

      {/* CUSTOMER FAVORITES */}
      <section className="container-pad pt-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="font-serif text-2xl md:text-3xl">
            Customer favorites
          </h2>
          <Link
            href="/menu"
            className="text-sm font-semibold text-gold-400 hover:text-gold-300"
          >
            View full menu →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {favorites.map((dish) => (
            <div
              key={dish.id}
              className="rounded-2xl border border-cream/10 bg-cream/5 p-3 shadow-soft"
            >
              <div className="relative mb-3 overflow-hidden rounded-xl border border-cream/10">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  width={600}
                  height={400}
                  className="h-36 w-full object-cover"
                />
              </div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  {/* <div className="font-semibold">{dish.name}</div>
                  <div className="mt-1 line-clamp-2 text-sm text-cream/75">
                    {dish.description}
                  </div> */}
                  <div className="font-semibold">{dish.name}</div>
                  <div className="mt-1 line-clamp-2 text-sm text-cream/75">
                    {dish.description}
                  </div>

                  {/* Special combo hint for Butter Chicken */}
                  {dish.id === "butter-chicken" && (
                    <Link
                      href="/menu?category=Breads"
                      className="mt-2 inline-block text-sm font-semibold text-gold-400 hover:text-gold-300"
                    >
                      Try with our breads or rice →
                    </Link>
                  )}
                </div>
                <div className="shrink-0 rounded-xl bg-gold-500/10 px-2 py-1 text-sm font-semibold text-gold-400">
                  ${dish.price.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
