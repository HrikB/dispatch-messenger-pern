import type { NextPage } from "next";
import Login from "./login";
import { useSelectUser } from "../hooks";
import { Sidebar, Friends } from "../components";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const user = useSelectUser();
  const router = useRouter();

  return (
    <div className="grid place-items-center bg-background h-screen w-screen relative overflow-x-hidden">
      {console.log(user)}
      {user === null ? (
        <Login />
      ) : (
        <div className="flex bg-black h-app w-app rounded-2xl shadow-app">
          <Sidebar />
          {
            {
              "/": <Friends />,
            }[router.pathname]
          }
        </div>
      )}
    </div>
  );
};

export default Home;
