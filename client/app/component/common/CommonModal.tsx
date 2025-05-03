"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import CommonButton from "./CommonButton";
import { ModalStatus } from "@/app/types";

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: boolean;
  variant?: ModalStatus;
  showCancel?: boolean;
  onConfirm?: () => void;
};

const iconMap: Record<ModalStatus, React.ReactNode> = {
  success: <CheckCircleIcon className="size-6 text-green-600" />,
  error: <XCircleIcon className="size-6 text-red-600" />,
  warning: <ExclamationCircleIcon className="size-6 text-yellow-600" />,
};

const CommonModal = ({
  isOpen,
  setIsOpen,
  title,
  description,
  children,
  footer = true,
  variant = "success",
  showCancel = true,
  onConfirm,
}: Props) => {
  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            {iconMap[variant]}
            {title}
          </AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>

        {children && <div className="pl-2">{children}</div>}

        <AlertDialogFooter>
          {footer && (
            <>
              {showCancel && (
                <CommonButton variant="outline" onClick={handleCancel}>
                  Cancel
                </CommonButton>
              )}
              <CommonButton onClick={handleConfirm}>OK</CommonButton>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CommonModal;
