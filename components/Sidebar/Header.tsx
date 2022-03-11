import { IconButton, Avatar } from "@mui/material";
import { useState, useRef } from "react";
import {
  useDelayUnmount,
  useOutOfBoundsClick,
  useSelectUser,
} from "../../hooks";
import { ProfileMenu, ProfileOptions } from "./Profile";
import Image from "next/image";

const buttonCSS =
  "my-[3px] box-border h-fit w-full bg-transparent p-[3px] text-[80%] hover:bg-[#403d3d] rounded";

function Header() {
  const user = useSelectUser();

  const [isOpenMounted, setIsOpenMounted] = useState<boolean>(false);
  const openProfile = useDelayUnmount(isOpenMounted, 180);
  const profileRef = useRef<HTMLDivElement>(null);
  useOutOfBoundsClick(profileRef, () => setIsOpenMounted(false));

  const [isUpdateMounted, setIsUpdateMounted] = useState<boolean>(false);
  const openUpdate = useDelayUnmount(isUpdateMounted, 180);
  const updateRef = useRef<HTMLDivElement>(null);
  useOutOfBoundsClick(updateRef, () => setIsUpdateMounted(false));

  const updateProfile = () => {
    setIsOpenMounted(false);
    setIsUpdateMounted(true);
  };

  return (
    <div className="flex justify-between items-center w-full px-2 mt-1">
      {openUpdate && (
        <ProfileMenu
          className={`${
            !isUpdateMounted ? "animate-fade-out" : "animate-fade-in"
          }`}
          ref={updateRef}
        />
      )}
      <div className="relative">
        <IconButton onClick={() => setIsOpenMounted(!isOpenMounted)}>
          <Avatar
            className="relative max-w-[32px] max-h-[32px]"
            src={user.profilePic}
          />
        </IconButton>
        {openProfile && (
          <ProfileOptions
            ref={profileRef}
            className={`${
              !isOpenMounted ? "animate-fade-out" : "animate-fade-in"
            } box-border p-[.4375rem] absolute bg-tertiary top-full left-1/2 w-fit cursor-auto whitespace-nowrap flex flex-col rounded items-center`}
            buttonCSS={buttonCSS}
            updateProfile={updateProfile}
          />
        )}
      </div>
      <h3 className="text-center text-2xl text-dispatch font-bold">Dispatch</h3>
      <IconButton>
        <Image width="32" height="32" src="/Compose.svg" alt="Compose" />
      </IconButton>
    </div>
  );
}

export default Header;
