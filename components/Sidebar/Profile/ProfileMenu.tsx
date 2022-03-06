import React, { ForwardedRef, forwardRef, useState, useRef } from "react";
import PreviewImage from "./PreviewImage";
import { IconButton, Avatar } from "@mui/material";
import {
  useDelayUnmount,
  useOutOfBoundsClick,
  useSelectUser,
} from "../../../hooks";
import { User } from "../../../types";
import EditInfo from "./EditInfo";

export interface ProfileMenuProps {
  className: string;
}

const profileFields = ["first name", "last name", "email"];

const ProfileMenu = forwardRef(({ className }: ProfileMenuProps, ref) => {
  const [previewImage, setPreviewImage] = useState<boolean>(false);
  const [toUpdate, setToUpdate] = useState<string>(profileFields[0]);

  const { firstName, lastName, email } = useSelectUser() as User;
  const userData = [firstName, lastName, email];

  const [isEditMounted, setIsEditMounted] = useState<boolean>(false);
  const openEdit = useDelayUnmount(isEditMounted, 180);
  const editRef = useRef<HTMLDivElement>(null);
  useOutOfBoundsClick(editRef, () => setIsEditMounted(false));

  const fileInput = useRef<HTMLInputElement>(null);

  const editProfileInfo = (toEdit: string): void => {
    setToUpdate(toEdit);
    setIsEditMounted(true);
  };

  const preview = () => {};

  return (
    <div
      className={`absolute top-0 left-0 w-screen h-screen bg-modalBack z-10 ${className}`}
    >
      <div
        className="box-border p-2.5 rounded-lg absolute w-[40rem] table top-1/2 bg-tertiary z-10 inset-x-0 translate-y-[-50%] my-0 mx-auto"
        ref={ref as ForwardedRef<HTMLDivElement>}
      >
        <h3 className="text-[1.1875rem] font-bold">Update Profile</h3>
        {previewImage ? (
          <PreviewImage />
        ) : (
          <>
            <div className="box-border table-row max-h-[50vh]">
              <div className="h-3/4 w-full absolute top-1/4 bg-prof-lower-background rounded-b-lg ml-[-10px] z-[-1]" />
              <label
                htmlFor="file__input"
                className="group hover:cursor-pointer inline-block h-fit my-[15px] rounded-[50%] border-[10px] border-solid border-black"
                onClick={() => fileInput.current && fileInput.current.click()}
              >
                <IconButton className="!p-0">
                  <Avatar className="!w-32 !h-32" />
                  <div className="pointer-events-none absolute bottom-0 h-full rounded-[50%] w-full duration-200 opacity-0 group-hover:bg-editPicture flex flex-col !z-20 justify-center items-center group-hover:opacity-100">
                    <h5 className="w-min text-sm font-bold">CHANGE AVATAR</h5>
                  </div>
                </IconButton>
              </label>
            </div>

            <input
              accept="image/*"
              id="file__input"
              type="file"
              ref={fileInput}
              style={{ display: "none" }}
              onChange={preview}
            />

            <div className="box-border bg-prof-info-background m-[0.9375rem] py-[.3125rem] px-[.9375rem] rounded-lg">
              {openEdit && (
                <EditInfo
                  toUpdate={toUpdate}
                  ref={editRef}
                  className={`${
                    !isEditMounted ? "animate-fade-out" : "animate-fade-in"
                  }`}
                />
              )}
              {profileFields.map((field, i) => (
                <div className="my-[.8125rem] relative">
                  <>
                    <p className="text-prof-info-heading my-[2px]">
                      {field.toUpperCase()}
                      <p>{userData[i]}</p>
                    </p>
                  </>
                  <button
                    className="w-min px-2.5 py-2 rounded text-sm text-black bg-[purple] h-fit absolute right-0 top-1/2 translate-y-[-50%] hover:bg-button-hover"
                    onClick={() => editProfileInfo(field)}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default ProfileMenu;
