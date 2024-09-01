import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center gap-2",
  {
    variants: {
      labelPosition: {
        leading: "flex-row",
        trailing: "flex-row-reverse",
      },
    },
    defaultVariants: {
      labelPosition: "leading",
    },
  }
);

export interface ToggleProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof toggleVariants> {
  label: string;
  activeColor?: string;
  inactiveColor?: string;
  toggleColor?: string;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ 
    className, 
    labelPosition, 
    label, 
    disabled, 
    checked, 
    activeColor = "#FF90E8", 
    inactiveColor = "white", 
    toggleColor = "black",
    ...props 
  }, ref) => {
    return (
      <label className={cn(toggleVariants({ labelPosition }), className, disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer")}>
        <span className="text-base leading-[140%] font-mabry-pro font-[400]">
          {label}
        </span>
        <div 
          className={cn(
            "relative w-[42px] h-6 rounded-full transition-colors duration-300 ease-in-out border border-black flex-shrink-0",
          )}
          style={{
            backgroundColor: checked ? activeColor : inactiveColor,
          }}
        >
          <div
            className={cn(
              "absolute w-5 h-5 rounded-full transition-transform duration-300 ease-bounce",
            )}
            style={{
              backgroundColor: toggleColor,
              transform: checked ? 'translateX(calc(100% - 2px))' : 'translateX(1px)',
              top: 'calc(50% - 10px)',
              left: '0',
            }}
          />
        </div>
        <input
          type="checkbox"
          className="sr-only"
          disabled={disabled}
          checked={checked}
          ref={ref}
          {...props}
        />
      </label>
    );
  }
);

Toggle.displayName = "Toggle";

export { Toggle, toggleVariants };