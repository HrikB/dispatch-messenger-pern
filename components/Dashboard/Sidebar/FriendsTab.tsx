import React from "react";
import { useRouter } from "next/router";
import { EmojiPeople } from "@mui/icons-material";

function FriendsTab() {
  const router = useRouter();

  return (
    <a
      className="w-full box-border"
      onClick={() => router.push("/friends", undefined, { shallow: true })}
    >
      <div className="box-border h-[50px] flex items-center rounded my-2.5 p-2.5 hover:bg-searchHover hover:cursor-pointer mx-2.5">
        <EmojiPeople style={{ fontSize: 30 }} />
        <p className="text-2xl font-bold">Friends</p>
      </div>
    </a>
  );
}

export default FriendsTab;
