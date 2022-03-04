import Header from "./Header";
import { Tabs } from "./_types";
import { useState } from "react";
import All from "./All";
import Pending from "./Pending";
import AddFriend from "./AddFriend";

function Friends() {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.All);

  return (
    <div className="flex-[1] relative flex flex-col z-1 max-w-[inherit] overflow-hidden">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      {
        {
          "0": <All />,
          "1": <Pending />,
          "2": <AddFriend />,
        }[activeTab]
      }
    </div>
  );
}

export default Friends;
