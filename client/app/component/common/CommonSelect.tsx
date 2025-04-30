"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

type CommonSelectProps = {
  placeholder?: string;
  defaultValue?: string;
  items: Option[];
  onChange?: (value: string) => void;
  className?: string;
};

const CommonSelect: React.FC<CommonSelectProps> = ({
  placeholder = "Select an option",
  defaultValue,
  items = [],
  onChange,
  className = "",
}) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={onChange}>
      <SelectTrigger className={`w-full rounded shadow-none ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded">
        {items?.length > 0 &&
          items.map((item) => (
            <SelectItem key={item.value} value={item.value} className="rounded">
              {item.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default CommonSelect;
