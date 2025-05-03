"use client";

import { SimpleMenuGroup } from "@/app/types";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type Props = {
  menuData: SimpleMenuGroup[];
};

const CommonMenu = ({ menuData }: Props) => {
  return (
    <Menubar className="p-0 shadow-none border-none h-auto">
      {menuData?.length > 0 &&
        menuData?.map((group) => (
          <MenubarMenu key={group.trigger}>
            {group?.items && group?.items?.length > 0 ? (
              <>
                <MenubarTrigger className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 cursor-pointer">
                  {group.trigger}
                  <ChevronDownIcon className="w-4 h-4" />
                </MenubarTrigger>
                <MenubarContent>
                  {group.items.map((item, index) => (
                    <MenubarItem
                      className="p-0"
                      key={index}
                      disabled={item.disabled}
                    >
                      <Link href={item.link || "#"} className="px-2 py-1.5">
                        {item.label}
                      </Link>
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </>
            ) : (
              <MenubarTrigger className="flex items-center gap-1 p-0 hover:bg-gray-100 cursor-pointer">
                <Link href={group?.link || "#"} className="px-2 py-1">
                  {group.trigger}
                </Link>
              </MenubarTrigger>
            )}
          </MenubarMenu>
        ))}
    </Menubar>
  );
};

export default CommonMenu;
