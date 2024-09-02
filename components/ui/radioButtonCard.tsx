import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { SaveIcon } from "@/components/icons";
import { Pill } from "@/components/ui/pill";

const radioButtonCardVariants = cva(
  "flex p-3.5 border border-black border-solid rounded box-border transition-all duration-200 cursor-pointer",
  {
    variants: {
      state: {
        selected: "bg-[rgba(255,255,255,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        unselected: "bg-[rgba(255,255,255,1)]",
        hover: "bg-[rgba(255,255,255,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mix-blend-multiply",
        disabled: "bg-[rgba(255,255,255,1)] opacity-30 cursor-not-allowed",
      },
      orientation: {
        horizontal: "flex-row w-[258px] h-[72px] gap-3",
        vertical: "flex-col w-[370px] h-[138px] gap-3",
      },
    },
    defaultVariants: {
      state: "unselected",
      orientation: "horizontal",
    },
  }
);

export interface RadioButtonCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof radioButtonCardVariants> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  pillText?: string;
  backgroundColor?: string;
  disabled?: boolean;
  selected?: boolean;
  orientation?: "horizontal" | "vertical";
  onClick?: () => void;
}

const RadioButtonCard = React.forwardRef<HTMLDivElement, RadioButtonCardProps>(
  ({ className, state, title, description, icon = <SaveIcon className="w-8 h-8" />, pillText, backgroundColor = "rgba(255,255,255,1)", disabled = false, selected = false, orientation = "horizontal", onClick, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyle = {
      backgroundColor,
    };

    return (
      <div
        className={cn(radioButtonCardVariants({ state: disabled ? "disabled" : isHovered ? "hover" : selected ? "selected" : "unselected", orientation }), className)}
        ref={ref}
        style={cardStyle}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => !disabled && setIsHovered(false)}
        onClick={!disabled ? onClick : undefined}
        {...props}
      >
        {pillText ? (
          <Pill text={pillText} size="regular" className="w-[70px]" />
        ) : (
          <div className="w-8 h-8">{icon}</div>
        )}
        <div className="relative flex flex-col justify-start items-start w-full h-full box-border">
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