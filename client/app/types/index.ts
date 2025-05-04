export type ModalStatus = "success" | "warning" | "error";

export type ModalMessageState = {
  message: string;
  status: ModalStatus;
};

export type User = {
  email: string;
  name: string;
  role: string;
};

export type SimpleMenuItem = {
  id: string | undefined;
  label: string;
  disabled?: boolean;
  link?: string;
  parent?: { id: string };
};

export type SimpleMenuGroup = {
  trigger: string;
  link?: string;
  items?: SimpleMenuItem[];
};

export type SubHeaderProps = {
  heading: string;
  addUrl?: string;
  closeUrl?: string;
  addLabel?: string;
  closeLabel?: string;
  showAddButton?: boolean;
  showCloseButton?: boolean;
  customActions?: React.ReactNode;
};

export type Column = {
  key: string;
  width?: string;
  label: string;
  render?: (row: any) => React.ReactNode;
};

export type CommonTableProps = {
  placeholder?: string;
  columns: Column[];
  data: any[];
  emptyMessage?: string;
  searchColumns?: string[];
};
