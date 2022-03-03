import type { NextPage } from "next";
import Login from "./login";
import { useSelectUser } from "../hooks";
import { Dashboard } from "../components";

const Home: NextPage = () => {
  const user = useSelectUser();

  return (
    <div className="grid place-items-center bg-background h-screen w-screen relative overflow-x-hidden">
      {console.log(user)}
      {user === null ? <Login /> : <Dashboard />}
    </div>
  );
};

export default Home;
