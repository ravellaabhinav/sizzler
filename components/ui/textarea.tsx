import * as React from "react";
import { cn } from "./cn";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-[90px] w-full rounded-xl border border-cream/20 bg-maroon-900/40 px-3 py-2 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-gold-500/50",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
