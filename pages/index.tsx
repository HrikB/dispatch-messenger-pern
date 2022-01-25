import { useState } from "react";
import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import { AppInfo, LoginBox, RegisterBox } from "../components";

const Home: NextPage = () => {
  const [registerModal, setRegisterModal] = useState<boolean>(false);

  return (
    <div className="h-app w-app bg-background flex flex-row justify-center items-center">
      <AppInfo />
      <LoginBox setRegisterModal={setRegisterModal} />
      {registerModal && (
        <div className="flex absolute justify-center items-center w-screen h-screen bg-opacity-90 bg-black">
          <RegisterBox setRegisterModal={setRegisterModal} />
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      data: "",
    },
  };
};

export default Home;
