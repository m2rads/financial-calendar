import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tooltipVariants = cva(
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

const tooltipContentVariants = cva(
  "absolute flex justify-start items-start opacity-0 transition-opacity duration-200 pointer-events-none",
  {
    variants: {
      position: {
        top: "flex-col bottom-full left-1/2 transform -translate-x-1/2 mb-2",
        bottom: "flex-col top-full left-1/2 transform -translate-x-1/2 mt-2",
        left: "flex-row right-full top-1/2 transform -translate-y-1/2 mr-2",
        right: "flex-row left-full top-1/2 transform -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: {
      position: "top",
    },
  }
)

export interface TooltipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipVariants> {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, size, content, position = 'top', children, ...props }, ref) => {
    return (
      <div
        className={cn(tooltipVariants({ size }), className, "group")}
        ref={ref}
        {...props}
      >
        {children}
        <div className={cn(tooltipContentVariants({ position }), "group-hover:opacity-100")}>
          {position === 'left' && (
            <div className="flex flex-row justify-start items-start h-[42px] box-border">
              <div className="flex flex-col justify-start items-start h-full p-2.5 border border-black border-solid rounded box-border bg-black">
                <p className="text-white text-sm leading-[130%] font-mabry-pro font-[400] whitespace-nowrap">
                  {content}
                </p>
              </div>
              <div className="w-2 h-full bg-[url('https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/f6y1di9w4d-I17243%3A528%3B17205%3A6380?alt=media&token=0b1f1973-05ac-4432-8b4a-1dba36371430')] bg-cover bg-center bg-no-repeat" />
            </div>
          )}
          {position === 'right' && (
            <div className="flex flex-row justify-start items-start h-[42px] box-border">
              <div className="w-2 h-full bg-[url('https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/pwtizhyg7o9-I17243%3A524%3B17205%3A6307?alt=media&token=16452ef9-3fec-4517-90e7-6524390dca06')] bg-cover bg-center bg-no-repeat" />
              <div className="flex flex-col justify-center items-start h-full p-2.5 border border-black border-solid rounded box-border bg-black">
                <p className="text-white text-sm leading-[130%] font-mabry-pro font-[400] whitespace-nowrap">
                  {content}
                </p>
              </div>
            </div>
          )}
          {(position === 'top' || position === 'bottom') && (
            // Existing top and bottom tooltip implementation
            <>
              <div className="p-2.5 border border-black border-solid rounded box-border bg-black">
                <p className="text-white text-sm leading-[130%] font-mabry-pro font-[400] whitespace-nowrap">
                  {content}
                </p>
              </div>
              <div className={cn(
                "w-4 h-2 bg-black",
                "absolute left-1/2 transform -translate-x-1/2",
                position === 'top' && "top-full",
                position === 'bottom' && "bottom-full rotate-180",
                "clip-path-triangle",
              )} />
            </>
          )}
        </div>
      </div>
    )
  }
)
Tooltip.displayName = "Tooltip"

export { Tooltip, tooltipVariants }