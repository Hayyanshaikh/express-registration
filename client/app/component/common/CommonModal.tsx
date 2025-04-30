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

export type ModalStatus = "success" | "warning" | "error";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: ModalStatus;
};

const iconMap: Record<ModalStatus, React.ReactNode> = {
  success: <CheckCircleIcon className="size-6 text-green-600" />,
  error: <XCircleIcon className="size-6 text-red-600" />,
  warning: <ExclamationCircleIcon className="size-6 text-yellow-600" />,
};

const CommonModal = ({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  footer,
  variant = "success",
}: Props) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
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
        {footer && <AlertDialogFooter>{footer}</AlertDialogFooter>}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CommonModal;
