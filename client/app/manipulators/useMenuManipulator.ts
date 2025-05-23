// app/hooks/useMenuManipulator.ts
import { SimpleMenuGroup, SimpleMenuItem } from "../types";

export const useMenuManipulator = (
  list: SimpleMenuItem[] | null
): SimpleMenuGroup[] => {
  if (!list) return [];

  // Filter top-level menus (no parent)
  const topLevelMenus = list.filter((item) => !item.parent);

  const data: SimpleMenuGroup[] = topLevelMenus.map((parentItem) => {
    // Get children of this parent
    const childItems = list.filter(
      (child) => child.parent?.id === parentItem.id
    );

    return {
      trigger: parentItem.label,
      link: parentItem.link,
      items: childItems.map((child) => ({
        id: child.id,
        label: child.label,
        link: child.link,
        disabled: child.disabled || false,
      })),
    };
  });

  return data;
};

export const useAllMenuManipulator = (list: any[]) => {
  if (!list) return [];

  const data = list.map((item) => {
    return {
      id: item?.id || "",
      name: item.label || "-",
      permission: item?.permissions || [],
      parent: item?.parent?.label || "-",
    };
  });

  return data;
};
