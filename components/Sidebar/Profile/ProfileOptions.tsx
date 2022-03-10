import { ForwardedRef, forwardRef } from "react";

export interface ProfileOptionsProps {
  className: string;
  buttonCSS: string;
  updateProfile: () => void;
}

export const ProfileOptions = forwardRef(
  ({ className, buttonCSS, updateProfile }: ProfileOptionsProps, ref) => {
    const logOut = () => {};

    return (
      <div className={className} ref={ref as ForwardedRef<HTMLDivElement>}>
        <button className={`${buttonCSS}`} onClick={updateProfile}>
          Update Profile
        </button>
        <button className={`${buttonCSS} text-error`} onClick={logOut}>
          Log Out
        </button>
      </div>
    );
  }
);

ProfileOptions.displayName = "ProfileOptions";

export default ProfileOptions;
