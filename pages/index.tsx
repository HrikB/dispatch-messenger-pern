import type { NextPage } from "next";
import { LoginBox } from "../components";

const Home: NextPage = () => {
  return (
    <div className="h-screen">
      <LoginBox />
    </div>
  );
};

export default Home;
