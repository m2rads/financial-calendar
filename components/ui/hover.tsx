import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const hoverVariants = cva(
  "flex flex-col justify-start items-center",
  {
    variants: {
      size: {
        default: "w-[60px] h-[50px]",
        // Add more sizes if needed
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const hoverContentVariants = cva(
  "flex flex-col justify-start items-start w-full p-2.5 border border-solid rounded box-border",
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
  ({ className, size, content, ...props }, ref) => {
    return (
      <div
        className={cn(hoverVariants({ size }), className)}
        ref={ref}
        {...props}
      >
        <div className={cn(hoverContentVariants())}>
          <p className="text-sm leading-[130%] font-mabry-pro font-[400]">
            {content}
          </p>
        </div>
        <div className="w-4 h-2 bg-black clip-path-triangle" />
      </div>
    )
  }
)
Hover.displayName = "Hover"

export { Hover, hoverVariants }