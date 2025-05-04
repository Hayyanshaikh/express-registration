"use client";
import React, { useEffect } from "react";
import CommonMenu from "../common/CommonMenu";
import { SimpleMenuGroup } from "@/app/types";
import { useControllerFindAllMenusByRole } from "@/app/api/api";
import useGetUser from "@/app/hooks/useGetUser";
import { useMenuManipulator } from "@/app/manipulators/useMenuManipulator";
import Link from "next/link";
import { ROUTES } from "@/app/lib/routes";
import CommonDropdown from "../common/CommonDropdown";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type Props = {};

const Header = (props: Props) => {
  const user = useGetUser();
  const router = useRouter();
  const { data, refetch } = useControllerFindAllMenusByRole(user?.role || "");
  useEffect(() => {
    refetch();
  }, [user]);

  const menuData: SimpleMenuGroup[] = useMenuManipulator(data?.data) || [];

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/login");
  };

  const dropdownItems = [
    { label: "My Profile" },
    { label: "Logout", onClick: handleLogout },
  ];

  return (
    <div className="py-3 border-b">
      <div className="container mx-auto px-3">
        <div className="flex items-center gap-3">
          <Link href={ROUTES.dashboard}>
            <h2 className="text-2xl font-bold">LOGO</h2>
          </Link>
          <CommonMenu className="ml-10" menuData={menuData} />
          <CommonDropdown
            className="ml-auto"
            trigger="My Acount"
            items={dropdownItems}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
