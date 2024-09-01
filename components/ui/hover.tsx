import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const hoverVariants = cva(
  "relative inline-block",
  {
    variants: {
      size: {
        default: "",
        // Add more sizes if needed
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const hoverContentVariants = cva(
  "absolute bottom-full left-1/2 transform -translate-x-1/2 flex flex-col justify-start items-start p-2.5 border border-solid rounded box-border opacity-0 transition-opacity duration-200 pointer-events-none",
  {
    variants: {
      variant: {
        default: "border-black bg-black text-white",
        // Add more variants if needed
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface HoverProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hoverVariants> {
  content: string
}

const Hover = React.forwardRef<HTMLDivElement, HoverProps>(
  ({ className, size, content, children, ...props }, ref) => {
    return (
      <div
        className={cn(hoverVariants({ size }), className, "group")}
        ref={ref}
        {...props}
      >
        {children}
        <div className={cn(hoverContentVariants(), "group-hover:opacity-100 mb-2")}>
          <p className="text-sm leading-[130%] font-mabry-pro font-[400] whitespace-nowrap">
            {content}
          </p>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black clip-path-triangle" />
        </div>
      </div>
    )
  }
)
Hover.displayName = "Hover"

export { Hover, hoverVariants }