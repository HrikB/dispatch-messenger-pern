import React from "react";
import Header from "./Header";
import Search from "./Search";
import FriendsTab from "./FriendsTab";

function Sidebar() {
  return (
    <div className="rounded-l-2xl flex flex-col h-full bg-sidebar w-80 items-center">
      <Header />
      <Search />
      <FriendsTab />
    </div>
  );
}

export default Sidebar;
