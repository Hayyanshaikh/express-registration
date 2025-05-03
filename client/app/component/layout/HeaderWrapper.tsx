"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

const HeaderWrapper = () => {
  const pathname = usePathname();

  // agar login ya signup page hai to Header render na karo
  if (pathname === "/login" || pathname === "/signup") return null;

  return <Header />;
};

export default HeaderWrapper;
