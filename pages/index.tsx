import type { NextPage } from "next";
import Login from "./login";
import { useSelectUser } from "../hooks";

const Home: NextPage = () => {
  const user = useSelectUser();

  return (
    <>
      {console.log(user)}
      <Login />;
    </>
  );
};

export default Home;
