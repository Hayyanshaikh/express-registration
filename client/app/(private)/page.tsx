"use client";
import React from "react";
import Cookies from "js-cookie";
import CommonButton from "../component/common/CommonButton";
import { useRouter } from "next/navigation";
import useGetUser from "../hooks/useGetUser";

const Home = () => {
  const user = useGetUser();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/login");
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center h-screen w-full">
      <h1 className="text-3xl">Welcome, {user?.name || "Guest"}</h1>
      <CommonButton onClick={handleLogout}>Logout</CommonButton>
    </div>
  );
};

export default Home;
