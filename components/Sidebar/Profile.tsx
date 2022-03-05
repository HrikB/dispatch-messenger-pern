import React, { ForwardedRef, forwardRef, useState, useRef } from "react";
import PreviewImage from "./PreviewImage";
import { IconButton, Avatar } from "@mui/material";

export interface ProfileProps {
  className: string;
}

const Profile = forwardRef(({ className }: ProfileProps, ref) => {
  const [previewImage, setPreviewImage] = useState<boolean>(false);
  const fileInput = useRef(null);

  const uploadFile = () => {};

  const preview = () => {};

  return (
    <div
      className={`absolute top-0 left-0 w-screen h-screen bg-modalBack z-10 ${className}`}
    >
      <div
        className="box-border p-2.5 rounded-lg absolute w-[40rem] table top-1/2 bg-tertiary z-10 inset-x-0 translate-y-[-50%] my-0 mx-auto"
        ref={ref as ForwardedRef<HTMLDivElement>}
      >
        <h3>Update Profile</h3>
        {previewImage ? (
          <PreviewImage />
        ) : (
          <>
            <div className="box-border table-row max-h-[50vh]">
              <div className="h-3/4 w-full absolute top-1/4 bg-[rgb(2, 2, 2)] rounded-b-lg ml-[-10px] z-[-1]" />
              <label
                htmlFor="file__input"
                className="group hover:cursor-pointer inline-block h-fit my-[15px] rounded-[50%] border-[10px] border-solid border-black"
                onClick={uploadFile}
              >
                <IconButton className="!p-0">
                  <Avatar className="!w-32 !h-32">
                    <svg
                      //@ts-ignore
                      class="MuiSvgIcon-root MuiAvatar-fallback"
                      focusable="false"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                  </Avatar>
                  <div className="pointer-events-none absolute bottom-0 h-full rounded-[50%] w-full transition-[ease] duration-[200ms] opacity-0 bg-[rgba(47, 79, 79, 0.9)] flex flex-col z-10 justify-center items-center group-hover:opacity-1">
                    <h5 className="w-min text-sm">CHANGE AVATAR</h5>
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
          </>
        )}
      </div>
    </div>
  );
});

export default Profile;
