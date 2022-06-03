import { useState } from "react";
import Loading from "../Loading";

function AddFriend() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h3 className="font-bold font-[18px]">ADD FRIEND</h3>
      <h5 className="my-2.5 font-thin font-[13px] leading-tight">
        You can add a friend using their email address.
      </h5>
      <form>
        <div className="box-border rounded-md h-[55px] px-4 relative flex items-center bg-add-friend-background">
          <input
            className="w-full rounded-sm border-none outline-none bg-add-friend-background mr-2.5 text-sm"
            placeholder="Enter an email..."
            type="text"
          />
          <button className="border-[1px] border-solid border-[#1d1d1d] h-3/4 w-1/5 rounded bg-save">
            {/* Get "Sent Request" on one line */}
            {loading ? (
              <Loading />
            ) : (
              <p className="text-center">Send Request</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFriend;
