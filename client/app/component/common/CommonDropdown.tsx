"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

type CommonDropdownProps = {
  trigger?: React.ReactNode;
  items: { label: string; onClick?: () => void }[];
  label?: string;
  className?: string;
};

const CommonDropdown: React.FC<CommonDropdownProps> = ({
  trigger = "Dropdown",
  items,
  label,
  className = "",
}) => {
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium">
          {trigger}
          <ChevronDownIcon size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {label && (
            <>
              <DropdownMenuLabel className={className}>
                {label}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className={className} />
            </>
          )}
          {items.map((item, index) => (
            <DropdownMenuItem
              className="cursor-pointer"
              key={index}
              onClick={item.onClick}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CommonDropdown;
