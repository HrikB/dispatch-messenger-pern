import React from "react";
import { IconButton, Avatar } from "@mui/material";

function Header() {
  return (
    <div className="flex justify-between items-center w-full px-4">
      <IconButton>
        <Avatar />
      </IconButton>
      <h3>Dispatch</h3>
      <IconButton>
        <img src="/Compose.svg" alt="Compose" />
      </IconButton>
    </div>
  );
}

export default Header;
