import React from "react";
import { Button } from "@/components/ui/button";
import { OutlineX } from "@/components/icons";
import { cn } from "@/lib/utils";

interface DialogProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  variant?: "horizontal" | "vertical";
}

const Dialog: React.FC<DialogProps> = ({ children, isOpen, onClose, variant = "horizontal" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={cn(
          "flex flex-col justify-start items-start gap-4 p-[30px] border border-black border-solid rounded box-border bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
          variant === "horizontal" ? "max-w-[700px] w-auto" : "w-80"
        )}
      >
        {children}
      </div>
    </div>
  );
};

const DialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={cn("w-full", className)} {...props}>
    {children}
  </div>
);

const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={cn("flex flex-row justify-between items-center w-full", className)} {...props}>
    {children}
  </div>
);

const DialogTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className, ...props }) => (
  <h2 className={cn("text-2xl leading-[130%] font-mabry-pro font-[400]", className)} {...props}>
    {children}
  </h2>
);

const DialogDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ children, className, ...props }) => (
  <p className={cn("text-base leading-[150%] font-mabry-pro font-[400]", className)} {...props}>
    {children}
  </p>
);

const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement> & { variant?: "horizontal" | "vertical" }> = ({ 
  children, 
  className, 
  variant = "horizontal", 
  ...props 
}) => (
  <div
    className={cn(
      "flex w-full",
      variant === "horizontal"
        ? "flex-row justify-end items-center gap-4"
        : "flex-col justify-center items-end gap-3",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const DialogClose: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ onClick, className, ...props }) => (
  <button onClick={onClick} className={cn("text-black", className)} {...props}>
    <OutlineX className="w-[18px] h-[18px]" />
  </button>
);

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose };