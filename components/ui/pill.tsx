import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { OutlineX } from "@/components/icons";

const pillVariants = cva(
  "flex flex-row justify-center items-center gap-2 border border-solid box-border transition-all duration-200",
  {
    variants: {
      size: {
        regular: "w-[91px] h-9 px-2.5 py-1.5 rounded-[160px] text-sm leading-[130%]",
        small: "h-6 px-1.5 py-0.5 rounded text-xs leading-[120%]",
      },
    },
    defaultVariants: {
      size: "regular",
    },
  }
);

export interface PillProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pillVariants> {
  text: string;
  icon?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverEffect?: boolean;
}

const Pill = React.forwardRef<HTMLDivElement, PillProps>(
  ({ className, size, text, icon = false, backgroundColor = "rgba(0,0,0,1)", textColor = "#ffffff", borderColor = "black", hoverEffect = false, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const pillStyle = {
      backgroundColor,
      borderColor,
      color: textColor,
      boxShadow: isHovered && hoverEffect ? "4px 4px 0px 0px rgba(0,0,0,1)" : "none",
      transform: isHovered && hoverEffect ? "translate(-2px, -2px)" : "none",
    };

    return (
      <div
        className={cn(pillVariants({ size }), className)}
        ref={ref}
        style={pillStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <p className="font-mabry-pro font-[400] text-center whitespace-nowrap">{text}</p>
        {icon && size === "regular" && <OutlineX className="w-3 h-3" />}
      </div>
    );
  }
);

Pill.displayName = "Pill";

export { Pill, pillVariants };