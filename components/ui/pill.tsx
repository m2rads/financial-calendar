import React from "react";
import { cn } from "@/lib/utils";

interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rounded' | 'small';
  children: React.ReactNode;
}

export const Pill: React.FC<PillProps> = ({ variant = 'rounded', children, className, ...props }) => {
  return (
    <div
      className={cn(
        "flex flex-row justify-center items-center gap-2 border border-black border-solid bg-white",
        variant === 'rounded' 
          ? "h-9 px-2.5 py-1.5 rounded-[160px]" 
          : "h-6 px-1 rounded inline-flex items-center", // Added px-1 and inline-flex items-center
        "hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200 ease-in-out",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const PillContent: React.FC<React.HTMLAttributes<HTMLParagraphElement> & { variant?: 'rounded' | 'small' }> = 
  ({ children, className, variant = 'rounded', ...props }) => {
  return (
    <p
      className={cn(
        "flex items-center justify-center font-mabry-pro font-[400] text-center", // Added items-center
        variant === 'rounded' 
          ? "text-sm leading-[130%]" 
          : "text-xs leading-[120%]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export const PillIcon: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ className, ...props }) => {
  return (
    <img
      className={cn("w-3 h-3", className)}
      {...props}
    />
  );
};