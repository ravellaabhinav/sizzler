import * as React from "react";
import { cn } from "./cn";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-gold-500/30 bg-gold-500/10 px-2.5 py-1 text-xs font-semibold text-gold-400",
        className
      )}
      {...props}
    />
  );
}
