import Header from "./Header";
import Search from "./Search";
import FriendsTab from "./FriendsTab";
import Conversations from "./Conversations";

function Sidebar() {
  return (
    <div className="rounded-l-2xl flex flex-col h-full bg-sidebar w-80 items-center">
      <Header />
      <Search />
      <FriendsTab />
      <Conversations />
    </div>
  );
}

export default Sidebar;
