import { IconButton, Avatar } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useDelayUnmount, useOutOfBoundsClick } from "../../hooks";
import Profile from "./Profile";

const buttonCSS =
  "my-[3px] box-border h-fit w-full bg-transparent p-[3px] text-[60%] hover:bg-[#403d3d] rounded";

function Header() {
  const [isOpenMounted, setIsOpenMounted] = useState<boolean>(false);
  const openProfile = useDelayUnmount(isOpenMounted, 200);
  const openRef = useRef(null);
  const outOfOpenBounds = useOutOfBoundsClick(openRef);

  useEffect(() => {
    if (outOfOpenBounds) setIsOpenMounted(false);
  }, [outOfOpenBounds]);

  const updateProfile = () => {};

  const logOut = () => {};

  return (
    <div className="flex justify-between items-center w-full px-2 mt-1">
      <IconButton>
        <Avatar
          onClick={() => setIsOpenMounted(!isOpenMounted)}
          className="relative max-w-[32px] max-h-[32px]"
        />
        {openProfile && (
          <div
            ref={openRef}
            className={`${
              !isOpenMounted ? "animate-fade-out" : "animate-fade-in"
            } box-border p-[.4375rem] absolute bg-[#171717] top-full left-1/2 w-fit cursor-auto whitespace-nowrap flex flex-col rounded items-center`}
          >
            <button className={`${buttonCSS}`} onClick={updateProfile}>
              Update Profile
            </button>
            <button className={`${buttonCSS} text-red-600`} onClick={logOut}>
              Log Out
            </button>
          </div>
        )}
      </IconButton>
      <h3 className="text-center text-2xl text-dispatch font-bold">Dispatch</h3>
      <IconButton>
        <img src="/Compose.svg" alt="Compose" />
      </IconButton>
    </div>
  );
}

export default Header;
