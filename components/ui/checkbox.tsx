import React, { forwardRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check2 } from "@/components/icons";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  selectedColor?: string;
  onChange?: (checked: boolean) => void;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, selectedColor = "#FF90E8", onChange, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(props.defaultChecked || false);

    useEffect(() => {
      if (props.checked !== undefined) {
        setIsChecked(props.checked);
      }
    }, [props.checked]);

    const handleClick = () => {
      if (!props.disabled) {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onChange?.(newChecked);
      }
    };

    return (
      <div className="relative inline-flex items-center" onClick={handleClick}>
        <input
          type="checkbox"
          className="sr-only"
          ref={ref}
          {...props}
          checked={isChecked}
          onChange={() => {}} // Add an empty onChange to satisfy React's controlled component requirement
        />
        <div 
          className={cn(
            "w-6 h-6 border rounded flex items-center justify-center transition-colors flex-shrink-0",
            isChecked ? "bg-current" : "border-black",
            props.disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer",
            className
          )}
          style={{ borderColor: isChecked ? selectedColor : 'black', color: selectedColor }}
        >
          {isChecked && <Check2 className="w-4 h-4 text-white" />}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };