import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  activeColor?: string;
  inactiveColor?: string;
  toggleColor?: string;
  onChange?: (checked: boolean) => void;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ 
    className, 
    disabled, 
    checked, 
    activeColor = "#FF90E8", 
    inactiveColor = "white", 
    toggleColor = "black",
    onChange,
    ...props 
  }, ref) => {
    const handleToggle = () => {
      if (!disabled && onChange) {
        onChange(!checked);
      }
    };

    return (
      <div 
        className={cn("inline-flex items-center", className, disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer")}
        onClick={handleToggle}
      >
        <div 
          className="relative rounded-full transition-colors duration-300 ease-in-out border border-black flex-shrink-0 h-6 w-[42px]"
          style={{
            backgroundColor: checked ? activeColor : inactiveColor,
          }}
        >
          <div
            className="absolute rounded-full transition-transform duration-300 ease-bounce w-5 h-5"
            style={{
              backgroundColor: toggleColor,
              transform: checked ? 'translateX(calc(100% - 2px))' : 'translateX(1px)',
              top: '1px',
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
          onChange={() => {}} // Add an empty onChange to suppress React warning
          {...props}
        />
      </div>
    );
  }
);

Toggle.displayName = "Toggle";

export { Toggle };