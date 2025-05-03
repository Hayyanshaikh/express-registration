"use client";
import React, { useEffect } from "react";
import CommonMenu from "../common/CommonMenu";
import { SimpleMenuGroup } from "@/app/types";
import { useControllerFindAllMenus } from "@/app/api/api";
import useGetUser from "@/app/hooks/useGetUser";
import useMenuManipulator from "@/app/manipulators/useMenuManipulator";

type Props = {};

const Header = (props: Props) => {
  const user = useGetUser();
  const { data, refetch } = useControllerFindAllMenus(user?.role || "");
  useEffect(() => {
    refetch();
  }, [user]);

  const menuData: SimpleMenuGroup[] = useMenuManipulator(data?.data) || [];

  return (
    <div>
      <CommonMenu menuData={menuData} />
    </div>
  );
};

export default Header;
