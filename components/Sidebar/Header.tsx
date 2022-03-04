import { IconButton, Avatar } from "@mui/material";
import { useState } from "react";
import Profile from "./Profile";

function Header() {
  return (
    <div className="flex justify-between items-center w-full px-2 mt-1">
      <IconButton>
        <Avatar className="relative max-w-[32px] max-h-[32px]" />
      </IconButton>
      <h3 className="text-center text-2xl text-dispatch font-bold">Dispatch</h3>
      <IconButton>
        <img src="/Compose.svg" alt="Compose" />
      </IconButton>
    </div>
  );
}

export default Header;
