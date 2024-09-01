import React from "react";
import { Button } from "@/components/ui/button";
import { OutlineX } from "@/components/icons";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "horizontal" | "vertical";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  variant = "horizontal",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={cn(
          "flex flex-col justify-start items-start gap-4 p-[30px] border border-black border-solid rounded box-border bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
          variant === "horizontal" ? "w-[700px]" : "w-80"
        )}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <h2 className="text-2xl leading-[130%] font-mabry-pro font-[400]">
            {title}
          </h2>
          <button onClick={onClose} className="text-black">
            <OutlineX className="w-[18px] h-[18px]" />
          </button>
        </div>
        <p className="text-base leading-[150%] font-mabry-pro font-[400]">
          {description}
        </p>
        <div
          className={cn(
            "flex w-full",
            variant === "horizontal"
              ? "flex-row justify-end items-center gap-4"
              : "flex-col justify-center items-end gap-3"
          )}
        >
          <Button
            onClick={onConfirm}
            className={cn(
              "bg-[rgba(220,52,30,1)]",
              variant === "vertical" && "w-full"
            )}
            textColor="white"  // Add this line
          >
            {confirmText}
          </Button>
          <Button
            onClick={onCancel}
            variant="default"
            className={cn(variant === "vertical" && "w-full")}
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Modal };