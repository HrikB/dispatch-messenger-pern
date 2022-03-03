import React from "react";
import Header from "./Header";

function Sidebar() {
  return (
    <div className="rounded-l-2xl flex flex-col h-full bg-sidebar w-80 items-center">
      <Header />
    </div>
  );
}

export default Sidebar;
