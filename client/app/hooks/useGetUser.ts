"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { User } from "../types";

// Custom hook to get user data from cookies
const useGetUser = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userFromCookies = JSON.parse(Cookies.get("user") || "{}");
    setUser(userFromCookies);
  }, []);

  return user;
};

export default useGetUser;
