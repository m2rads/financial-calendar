import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "flex justify-start items-start w-[538px] p-2.5 border border-black border-solid rounded box-border",
  {
    variants: {
      variant: {
        default: "",
        destructive: "border-red-500 text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode
  onClose?: () => void
  showCloseButton?: boolean
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, icon, onClose, showCloseButton, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleClose = () => {
      setIsVisible(false);
      onClose?.();
    };

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <div className="flex flex-row justify-between items-start w-full">
          <div className="flex flex-row items-start gap-2 flex-grow">
            {icon && <div className="flex-shrink-0 text-lg">{icon}</div>}
            <div className="flex-grow">{children}</div>
          </div>
          {showCloseButton && (
            <button
              onClick={handleClose}
              className="text-sm leading-[130%] font-mabry-pro font-[400] underline cursor-pointer ml-2"
            >
              close
            </button>
          )}
        </div>
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm leading-[130%] font-mabry-pro font-[400]", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

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

const AlertActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-row justify-start items-start gap-2 w-full mt-3 pl-[26px]", className)}
    {...props}
  />
))
AlertActions.displayName = "AlertActions"

const AlertContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-row items-start gap-2 flex-grow", className)}
    {...props}
  />
))
AlertContent.displayName = "AlertContent"

export { Alert, AlertTitle, AlertDescription, AlertActions, AlertContent }