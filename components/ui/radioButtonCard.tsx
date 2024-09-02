import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { SaveIcon } from "@/components/icons";

const radioButtonCardVariants = cva(
  "flex flex-row justify-start items-start gap-3 w-[258px] h-[72px] p-3.5 border border-black border-solid rounded box-border transition-all duration-200 cursor-pointer",
  {
    variants: {
      state: {
        selected: "bg-[rgba(255,255,255,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        unselected: "bg-[rgba(255,255,255,1)]",
        hover: "bg-[rgba(255,255,255,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mix-blend-multiply",
        disabled: "bg-[rgba(255,255,255,1)] opacity-30 cursor-not-allowed",
      },
    },
    defaultVariants: {
      state: "unselected",
    },
  }
);

export interface RadioButtonCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof radioButtonCardVariants> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

const RadioButtonCard = React.forwardRef<HTMLDivElement, RadioButtonCardProps>(
  ({ className, state, title, description, icon = <SaveIcon />, backgroundColor = "rgba(255,255,255,1)", disabled = false, selected = false, onClick, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyle = {
      backgroundColor,
    };

    return (
      <div
        className={cn(radioButtonCardVariants({ state: disabled ? "disabled" : isHovered ? "hover" : selected ? "selected" : "unselected" }), className)}
        ref={ref}
        style={cardStyle}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => !disabled && setIsHovered(false)}
        onClick={!disabled ? onClick : undefined}
        {...props}
      >
        <div className="w-6 h-6">{icon}</div>
        <div className="relative flex flex-col justify-start items-start w-[190px] h-[100%] box-border">
          <p className="absolute top-[22px] text-sm leading-[130%] font-mabry-pro font-[400]">
            {description}
          </p>
          <p className="text-base leading-[140%] font-mabry-pro font-[700]">
            {title}
          </p>
        </div>
      </div>
    );
  }
);

RadioButtonCard.displayName = "RadioButtonCard";

export { RadioButtonCard, radioButtonCardVariants };