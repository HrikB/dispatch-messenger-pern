import type { NextPage } from "next";
import { AppInfo, LoginBox } from "../components";

const Home: NextPage = () => {
  return (
    <div className="h-app w-app bg-background flex flex-row justify-center items-center">
      <AppInfo />
      <LoginBox />
    </div>
  );
};

export default Home;
