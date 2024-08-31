import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { SaveIcon, SearchIcon, EyeFill } from "@/components/icons"

const buttonVariants = cva(
  "flex flex-row justify-center items-center gap-2 px-3.5 py-2.5 border border-solid rounded box-border font-mabry-pro text-base leading-[140%] font-[400] text-center transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-black hover:bg-[rgba(251,251,249,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:bg-transparent active:shadow-none",
        disabled: "border-black opacity-30 cursor-not-allowed",
        hover: "border-black bg-[rgba(251,251,249,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:bg-transparent active:shadow-none",
      },
      size: {
        default: "h-12",
        icon: "w-12 h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const iconMap = {
  save: SaveIcon,
  search: SearchIcon,
  eye: EyeFill,
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: keyof typeof iconMap
  rightIcon?: keyof typeof iconMap
  iconOnly?: keyof typeof iconMap
  backgroundColor?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, leftIcon, rightIcon, iconOnly, backgroundColor, children, onClick, ...props }, ref) => {
    const [isClicked, setIsClicked] = React.useState(false);
    const IconLeft = leftIcon ? iconMap[leftIcon] : null
    const IconRight = rightIcon ? iconMap[rightIcon] : null
    const IconOnly = iconOnly ? iconMap[iconOnly] : null

    const buttonStyle = backgroundColor ? { backgroundColor, borderColor: backgroundColor } : {}

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200); // Reset after 200ms
      onClick && onClick(event);
    };

    const buttonClass = cn(
      buttonVariants({ variant, size }),
      isClicked && 'bg-transparent shadow-none',
      className
    );

    if (iconOnly && IconOnly) {
      return (
        <button
          className={buttonClass}
          ref={ref}
          style={buttonStyle}
          onClick={handleClick}
          {...props}
        >
          <IconOnly className="w-6 h-6" />
        </button>
      )
    }

    return (
      <button
        className={buttonClass}
        ref={ref}
        style={buttonStyle}
        onClick={handleClick}
        {...props}
      >
        {IconLeft && <IconLeft className="w-[18px] h-[18px]" />}
        {children}
        {IconRight && <IconRight className="w-[18px] h-[18px]" />}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }