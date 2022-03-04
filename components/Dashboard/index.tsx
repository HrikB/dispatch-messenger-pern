export * from "./Conversation";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import Friends from "./Friends";

function Dashboard() {
  const router = useRouter();

  return (
    <div className="flex bg-black h-app w-app rounded-2xl shadow-app">
      {console.log(router)}
      <Sidebar />
      {router.pathname === "/" && <Friends />}
    </div>
  );
}

export default Dashboard;
