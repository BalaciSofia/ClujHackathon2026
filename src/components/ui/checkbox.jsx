import * as React from "react";
import { cn } from "../../lib/utils";

const Checkbox = React.forwardRef(({ className, checked, onCheckedChange, id, ...props }, ref) => {
  return (
    <button
      type="button"
      ref={ref}
      role="checkbox"
      aria-checked={checked}
      id={id}
      onClick={() => onCheckedChange && onCheckedChange(!checked)}
      className={cn(
        "peer h-4.5 w-4.5 shrink-0 rounded border border-border focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all flex items-center justify-center select-none cursor-pointer",
        checked ? "bg-indigo-600 border-indigo-600 text-white" : "bg-bg-card hover:border-text/40",
        className
      )}
      {...props}
    >
      {checked && (
        <svg
          className="h-3 w-3 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
