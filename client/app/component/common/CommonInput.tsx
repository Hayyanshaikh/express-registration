"use client";
import React from "react";
import { Input } from "@/components/ui/input";

type CommonInputProps = {
  name: string;
  value: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const CommonInput: React.FC<CommonInputProps> = ({
  name,
  value,
  type = "text",
  placeholder = "",
  required = false,
  onChange,
  className = "",
}) => {
  return (
    <Input
      name={name}
      value={value}
      type={type}
      required={required}
      placeholder={placeholder}
      className={`shadow-none rounded ${className}`}
      onChange={onChange}
    />
  );
};

export default CommonInput;
