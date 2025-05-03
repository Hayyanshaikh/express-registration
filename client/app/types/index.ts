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
