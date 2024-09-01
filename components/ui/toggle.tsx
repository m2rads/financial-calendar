import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "flex items-center gap-2",
  {
    variants: {
      labelPosition: {
        leading: "flex-row-reverse",
        trailing: "flex-row",
      },
    },
    defaultVariants: {
      labelPosition: "trailing",
    },
  }
);

export interface ToggleProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof toggleVariants> {
  label: string;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, labelPosition, label, disabled, checked, ...props }, ref) => {
    return (
      <label className={cn(toggleVariants({ labelPosition }), className, disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer")}>
        <input
          type="checkbox"
          className="sr-only"
          disabled={disabled}
          checked={checked}
          ref={ref}
          {...props}
        />
        <span className="text-base leading-[140%] font-mabry-pro font-[400]">
          {label}
        </span>
        <div 
          className={cn(
            "relative w-[42px] h-6 rounded-full transition-colors",
            checked ? "bg-black" : "bg-[#D9D9D9]"
          )}
        >
          <div
            className={cn(
              "absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform",
              checked ? "right-0.5" : "left-0.5"
            )}
          />
        </div>
      </label>
    );
  }
);

Toggle.displayName = "Toggle";

export { Toggle, toggleVariants };