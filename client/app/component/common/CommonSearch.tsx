"use client";
import React from "react";
import CommonInput from "@/app/component/common/CommonInput";
import { SearchIcon } from "lucide-react";

type CommonSearchProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};

const CommonSearch: React.FC<CommonSearchProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={`relative flex items-center space-x-2 mb-4 ${className}`}>
      <SearchIcon
        size={18}
        className="absolute top-1/2 -translate-1/2 left-5 text-gray-400"
      />
      <CommonInput
        name="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`${className} pl-10`}
      />
    </div>
  );
};

export default CommonSearch;
