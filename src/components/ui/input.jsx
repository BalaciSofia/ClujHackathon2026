import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex w-full bg-bg-card text-text-h border border-neutral-300 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:ring-offset-0 hover:border-text/40 transition-all font-medium placeholder:text-text/60 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
