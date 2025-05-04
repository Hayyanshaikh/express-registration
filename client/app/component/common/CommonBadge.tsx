import { Badge } from "@/components/ui/badge";
import React from "react";

type CommonBadgeProps = {
  label: string;
  className?: string;
};

const CommonBadge: React.FC<CommonBadgeProps> = ({ label, className = "" }) => {
  return (
    <Badge
      className={`${className} bg-gray-100 text-gray-600 border border-gray-300 rounded-sm `}
    >
      {label}
    </Badge>
  );
};

export default CommonBadge;
