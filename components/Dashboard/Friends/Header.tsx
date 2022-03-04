import { EmojiPeople } from "@mui/icons-material";
import { Tabs, HeaderProps } from "./_types";

const buttonCSS: string = "flex items-center h-8 mx-1 rounded";
const pCSS: string = "font-bold text-center whitespace-nowrap p-2";

const { All, Pending, AddFriend } = Tabs;

function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <div className="py-2.5 px-[0.3125rem] flex items-center max-w-[inherit] flex-row justify-between border-b border-solid border-white">
      <div className="flex min-w-min">
        <div className="flex min-w-fit pr-2.5 mx-2.5 border-r border-solid border-white">
          <EmojiPeople style={{ fontSize: 30 }} />
          <h1 className="text-2xl font-bold">Friends</h1>
        </div>

        <button
          className={`${buttonCSS} ${activeTab === All && "bg-[#424242]"}`}
          onClick={() => setActiveTab(All)}
        >
          <p className={`${pCSS}`}>All</p>
        </button>
        <button
          className={`${buttonCSS} ${activeTab === Pending && "bg-[#424242]"}`}
          onClick={() => setActiveTab(Pending)}
        >
          <p className={`${pCSS}`}>Pending</p>
        </button>
      </div>
      <div className="flex">
        <button
          className={`${buttonCSS} ${
            activeTab !== AddFriend && "bg-[#005f00]"
          }`}
          onClick={() => setActiveTab(AddFriend)}
        >
          <p
            className={`${pCSS} ${
              activeTab === AddFriend && " text-[#00ff00]"
            }`}
          >
            Add Friend
          </p>
        </button>
      </div>
    </div>
  );
}

export default Header;
