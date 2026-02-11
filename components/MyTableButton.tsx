"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { readMyTable, totalCount } from "@/lib/myTable";
import { cn } from "@/components/ui/cn";

export default function MyTableButton({ className }: { className?: string }) {
  const [mounted, setMounted] = React.useState(false);
  const [count, setCount] = React.useState<number>(0);

  React.useEffect(() => {
    setMounted(true);

    const sync = () => {
      try {
        setCount(totalCount(readMyTable()));
      } catch {
        setCount(0);
      }
    };

    sync();
    const t = window.setInterval(sync, 600);
    window.addEventListener("storage", sync);

    return () => {
      window.clearInterval(t);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // ✅ Prevent hydration mismatch: don't render anything until mounted
  if (!mounted || count <= 0) return null;

  return (
    <div className={cn("fixed bottom-20 right-4 z-40", className)}>
      <Link href="/my-table">
        <Button className="rounded-full px-5 shadow-soft">
          My Table ({count})
        </Button>
      </Link>
    </div>
  );
}
