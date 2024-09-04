import React, { createContext, useContext, useState } from 'react';
import { cn } from "@/lib/utils";

interface RadioGroupContextType {
  value: string | null;
  onChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ 
  children, 
  defaultValue, 
  value: controlledValue, 
  onValueChange,
  className,
  ...props 
}) => {
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue || null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const onChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <RadioGroupContext.Provider value={{ value, onChange }}>
      <div className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ 
  className, 
  children, 
  value,
  id,
  disabled,
  ...props 
}) => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroupItem must be used within a RadioGroup');
  }

  const { value: groupValue, onChange } = context;
  const [isClicked, setIsClicked] = React.useState(false);

  const handleClick = () => {
    if (!disabled) {
      setIsClicked(true);
      onChange(value);
      setTimeout(() => setIsClicked(false), 100);
    }
  };

  const isSelected = groupValue === value;

  return (
    <label 
      htmlFor={id}
      className={cn(
        "flex flex-row justify-start items-start gap-3 w-[258px] min-h-[72px] p-3.5 border border-black border-solid rounded box-border bg-white cursor-pointer",
        "transition-all duration-100",
        !disabled && !isSelected && "hover:bg-[rgba(251,251,249,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        isSelected && "bg-[rgba(251,251,249,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        isClicked && "bg-transparent shadow-none",
        disabled && "opacity-30 cursor-not-allowed",
        className
      )}
      onClick={handleClick}
    >
      <input
        type="radio"
        className="sr-only"
        value={value}
        checked={isSelected}
        onChange={() => {}}
        id={id}
        disabled={disabled}
        {...props}
      />
      {children}
    </label>
  );
};

export const RadioGroupLabel: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ 
  className, 
  children,
  ...props 
}) => (
  <label className={cn("text-base leading-[140%] font-mabry-pro font-[700]", className)} {...props}>
    {children}
  </label>
);

export const RadioGroupDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ 
  className, 
  children,
  ...props 
}) => (
  <p className={cn("text-sm leading-[130%] font-mabry-pro font-[400] text-gray-500 mt-1 break-words", className)} {...props}>
    {children}
  </p>
);