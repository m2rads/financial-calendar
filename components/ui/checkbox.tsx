import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Check2 } from "@/components/icons";

const checkboxVariants = cva(
  "flex items-center gap-2",
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

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof checkboxVariants> {
  label: string;
  selectedColor?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, labelPosition, label, disabled, checked, selectedColor = "#FF90E8", ...props }, ref) => {
    return (
      <label className={cn(checkboxVariants({ labelPosition }), className, disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer")}>
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
            "w-6 h-6 border rounded flex items-center justify-center transition-colors",
            checked ? "bg-current" : "border-black"
          )}
          style={{ borderColor: checked ? selectedColor : 'black', color: selectedColor }}
        >
          {checked && <Check2 className="w-4 h-4 text-white" />}
        </div>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants };