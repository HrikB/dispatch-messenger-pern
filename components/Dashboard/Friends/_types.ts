import { Dispatch, SetStateAction } from "react";

export enum Tabs {
  All,
  Pending,
  AddFriend,
}

export interface HeaderProps {
  activeTab: Tabs;
  setActiveTab: Dispatch<SetStateAction<Tabs>>;
}
