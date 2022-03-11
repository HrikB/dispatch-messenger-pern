import { ChangeEvent, ForwardedRef, forwardRef, useState } from "react";
import PreviewImage from "./PreviewImageMenu";
import DefaultMenu from "./DefaultMenu";

export interface ProfileMenuProps {
  className: string;
}

const ProfileMenu = forwardRef(({ className }: ProfileMenuProps, ref) => {
  const [previewImage, setPreviewImage] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  const preview = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        if (
          e.target === null ||
          e.target.result === null ||
          e.target.result instanceof ArrayBuffer
        )
          return;
        setImage(e.target.result);
      };

      fileReader.readAsDataURL(e.target.files[0]);
      setPreviewImage(true);
    }
  };

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
          <PreviewImage image={image} setPreviewImage={setPreviewImage} />
        ) : (
          <DefaultMenu preview={preview} />
        )}
      </div>
    </div>
  );
});

ProfileMenu.displayName = "ProfileMenu";

export default ProfileMenu;
