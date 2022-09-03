import Header from "./Header";
import { Tabs } from "./_types";
import { useState } from "react";
import All from "./All.server";
import Pending from "./Pending";
import AddFriend from "./AddFriend";

function Friends() {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.All);

  return (
    <div className="flex-[1] relative flex flex-col z-1 max-w-[inherit] overflow-hidden">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="border-box px-[30px] py-[20px] overflow-y-scroll h-full">
        {
          {
            "0": <All />,
            "1": <Pending />,
            "2": <AddFriend />,
          }[activeTab]
        }
      </div>
    </div>
  );
}

export default Friends;
