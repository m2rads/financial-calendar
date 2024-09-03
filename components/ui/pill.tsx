import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

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

interface PillProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pillVariants> {
  hoverEffect?: boolean;
}

const Pill = React.forwardRef<HTMLDivElement, PillProps>(
  ({ className, size, children, hoverEffect = false, ...props }, ref) => {
    return (
      <div
        className={cn(pillVariants({ size }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Pill.displayName = "Pill";

const PillContent = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn("font-mabry-pro font-[400] text-center whitespace-nowrap", className)} {...props}>
      {children}
    </p>
  )
);

PillContent.displayName = "PillContent";

export { Pill, PillContent, pillVariants };