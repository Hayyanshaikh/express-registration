"use client";
import React from "react";
import CommonButton from "../common/CommonButton";
import { useRouter } from "next/navigation";
import { SubHeaderProps } from "@/app/types";

const SubHeader: React.FC<SubHeaderProps> = ({
  heading,
  addUrl,
  closeUrl,
  addLabel = "Add",
  closeLabel = "Close",
  showAddButton = true,
  showCloseButton = true,
  customActions,
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold">{heading}</h2>
      <div className="space-x-2 flex items-center">
        {customActions}
        {showCloseButton && closeUrl && (
          <CommonButton variant="outline" onClick={() => router.push(closeUrl)}>
            {closeLabel}
          </CommonButton>
        )}
        {showAddButton && addUrl && (
          <CommonButton onClick={() => router.push(addUrl)}>
            {addLabel}
          </CommonButton>
        )}
      </div>
    </div>
  );
};

export default SubHeader;
