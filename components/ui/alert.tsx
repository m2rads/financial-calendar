import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { CheckCircleFill, SolidXCircle, SolidShieldExclamation, SolidExclamationCircle } from "@/components/icons"

const alertVariants = cva(
  "relative w-full max-w-[538px] p-2.5 border border-solid rounded box-border shadow-lg transition-all duration-300 mb-[3px]",
  {
    variants: {
      variant: {
        default: "border-black bg-white",
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

export type AlertProps = React.HTMLAttributes<HTMLDivElement> & 
  VariantProps<typeof alertVariants>

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => {
    const icon = React.useMemo(() => {
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
    }, [variant]);

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <div className="flex flex-row items-start gap-2 w-full">
          {icon && <div className="flex-shrink-0 text-lg">{icon}</div>}
          <div className="flex-grow">{props.children}</div>
        </div>
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("text-sm leading-[130%] font-mabry-pro font-[400]", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm leading-[130%] font-mabry-pro font-[400]", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

const AlertClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => (
  <button
    ref={ref}
    onClick={onClick}
    className={cn("text-sm leading-[130%] font-mabry-pro font-[400] underline cursor-pointer ml-2", className)}
    {...props}
  >
    close
  </button>
))
AlertClose.displayName = "AlertClose"

export { Alert, AlertTitle, AlertDescription, AlertClose }