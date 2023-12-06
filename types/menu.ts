import { ElementType } from "react";

export type Menu = {
  id: number;
  icon: ElementType;
  newTab: boolean;
  title?: string;
  path?: string;
  submenu?: Menu[];
};
