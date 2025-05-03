"use client";
import React from "react";
import { Button } from "@/components/ui/button";

type CommonButtonProps = {
  variant?: "primary" | "outline" | "link";
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const CommonButton = ({
  variant = "primary",
  onClick,
  children,
  type = "button",
  className = "",
}: CommonButtonProps) => {
  return (
    <Button
      variant={
        variant === "primary"
          ? "default"
          : variant === "outline"
          ? "outline"
          : "link"
      }
      onClick={onClick}
      type={type}
      className={className}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
