import { ForwardedRef, forwardRef } from "react";
import { useUser } from "../../../hooks";

export interface ProfileOptionsProps {
  className: string;
  buttonCSS: string;
  updateProfile: () => void;
}

export const ProfileOptions = forwardRef(
  ({ className, buttonCSS, updateProfile }: ProfileOptionsProps, ref) => {
    const [user, updateUser] = useUser();

    const logOut = () => {
      updateUser(null);
    };

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
