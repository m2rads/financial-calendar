import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, htmlFor, ...props }, ref) => (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={cn("text-base leading-[140%] font-mabry-pro font-[400]", className)}
      {...props}
    />
  )
);

Label.displayName = "Label";

export { Label };