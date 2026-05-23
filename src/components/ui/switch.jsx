import * as React from "react";
import { cn } from "../../lib/utils";

const Switch = React.forwardRef(({ checked, onCheckedChange, id, ariaLabel, className, ...props }, ref) => {
  return (
    <button
      id={id}
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onCheckedChange && onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
        checked ? "bg-indigo-600" : "bg-border",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
});

Switch.displayName = "Switch";

export { Switch };
