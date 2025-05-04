"use client";
import {
  useControllerDeleteMenu,
  useControllerFindAllMenus,
} from "@/app/api/api";
import CommonBadge from "@/app/component/common/CommonBadge";
import CommonButton from "@/app/component/common/CommonButton";
import CommonModal from "@/app/component/common/CommonModal";
import CommonTable from "@/app/component/common/CommonTable";
import SubHeader from "@/app/component/SubHeader";
import { ROUTES } from "@/app/lib/routes";
import { useAllMenuManipulator } from "@/app/manipulators/useMenuManipulator";
import { Column, ModalMessageState } from "@/app/types";
import React, { useState } from "react";

const Menus = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<ModalMessageState>({
    message: "",
    status: "success",
  });

  const { data, refetch } = useControllerFindAllMenus();
  const menuData = useAllMenuManipulator(data?.data || []);
  const { mutateAsync: deleteMenu } = useControllerDeleteMenu();

  const handleDeleteMenu = async () => {
    if (!selectedId) return;

    try {
      const res = await deleteMenu(selectedId);
      setModalMessage({ status: res?.status, message: res?.message });
    } catch (err: any) {
      setModalMessage({
        status: err?.response?.data?.status || "error",
        message: err?.response?.data?.message || "Failed to delete.",
      });
    } finally {
      setIsStatusOpen(true);
      setIsConfirmOpen(false);
      refetch();
    }
  };

  const renderPermission = (row: any) => (
    <div className="flex items-center gap-1">
      {row?.permission?.map((item: string, index: number) => (
        <CommonBadge key={index} label={item} />
      ))}
    </div>
  );

  const columns: Column[] = [
    { key: "name", label: "Name", width: "200px" },
    {
      key: "permission",
      label: "Permission",
      render: renderPermission,
      width: "200px",
    },
    { key: "parent", label: "Parent Menu", width: "200px" },
    {
      key: "actions",
      label: "Actions",
      width: "150px",
      render: (row) => (
        <CommonButton
          onClick={() => {
            setSelectedId(row?.id);
            setIsConfirmOpen(true);
          }}
        >
          Delete
        </CommonButton>
      ),
    },
  ];

  return (
    <div>
      <SubHeader
        heading="Menu Listing"
        addUrl={ROUTES.createMenu}
        closeUrl={ROUTES.dashboard}
        showAddButton={true}
        showCloseButton={true}
      />

      <CommonTable
        searchColumns={["name", "parent"]}
        columns={columns}
        data={menuData}
        placeholder="Search by Name and Parent Menu"
      />

      {/* ⚠️ Confirmation Modal */}
      <CommonModal
        isOpen={isConfirmOpen}
        setIsOpen={setIsConfirmOpen}
        title="Are you sure?"
        description="This action will delete the menu permanently."
        variant="warning"
        onConfirm={handleDeleteMenu}
      />

      {/* ✅ Result Modal */}
      <CommonModal
        isOpen={isStatusOpen}
        setIsOpen={setIsStatusOpen}
        title={`Delete ${modalMessage?.status}`}
        variant={modalMessage?.status}
        footer={true}
        showCancel={false}
        onConfirm={() => setIsStatusOpen(false)}
      >
        <p className="text-gray-500">{modalMessage?.message}</p>
      </CommonModal>
    </div>
  );
};

export default Menus;
