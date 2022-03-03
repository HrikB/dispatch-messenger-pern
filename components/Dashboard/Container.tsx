import React from "react";
import Sidebar from "./Sidebar";

function Container() {
  return (
    <div className="flex bg-black h-app w-app rounded-2xl shadow-app">
      <Sidebar />
    </div>
  );
}

export default Container;
