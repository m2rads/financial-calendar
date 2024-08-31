import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { CheckCircleFill, SolidXCircle, SolidShieldExclamation, SolidExclamationCircle } from "@/components/icons"

const alertVariants = cva(
  "flex justify-start items-start w-[538px] p-2.5 border border-solid rounded box-border",
  {
    variants: {
      variant: {
        default: "border-black",
        success: "bg-[rgba(211,243,240,1)] border-[#23A094]",
        danger: "bg-[rgba(248,214,210,1)] border-[#DC341E]",
        warning: "bg-[rgba(253,244,208,1)] border-[#FFC900]",
        info: "bg-[rgba(233,238,250,1)] border-[#90A8ED]",
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
  onClose?: () => void
  showCloseButton?: boolean
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, onClose, showCloseButton, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleClose = () => {
      setIsVisible(false);
      onClose?.();
    };

    if (!isVisible) return null;

    const getIcon = () => {
      switch (variant) {
        case "success":
          return <CheckCircleFill className="text-[#23A094]" />;
        case "danger":
          return <SolidXCircle className="text-[#DC341E]" />;
        case "warning":
          return <SolidShieldExclamation className="text-[#FFC900]" />;
        case "info":
          return <SolidExclamationCircle className="text-[#90A8ED]" />;
        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <div className="flex flex-row justify-between items-start w-full">
          <div className="flex flex-row items-start gap-2 flex-grow">
            {getIcon() && <div className="flex-shrink-0 text-lg">{getIcon()}</div>}
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