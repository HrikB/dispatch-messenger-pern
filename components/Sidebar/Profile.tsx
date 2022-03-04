import { ForwardedRef, forwardRef } from "react";

const Profile = forwardRef((props, ref) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 w-16 h-16 bg-white z-10"
      ref={ref as ForwardedRef<HTMLDivElement>}
    ></div>
  );
});

export default Profile;
