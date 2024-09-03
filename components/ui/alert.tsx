import * as React from "react"
import { cn } from "@/lib/utils"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, children, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "flex items-start gap-2 w-full max-w-[538px] p-2.5 border border-solid rounded box-border shadow-lg transition-all duration-300 mb-[3px]",
          className
        )}
        {...props}
      >
        {icon && <div className="flex-shrink-0 text-lg">{icon}</div>}
        <div className="flex-grow flex justify-between items-start">
          {children}
        </div>
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm leading-[130%] font-mabry-pro font-[400]", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

const AlertClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn("text-sm leading-[130%] font-mabry-pro font-[400] underline cursor-pointer ml-2 flex-shrink-0", className)}
    {...props}
  >
    close
  </button>
))
AlertClose.displayName = "AlertClose"

export { Alert, AlertDescription, AlertClose }