import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
  PreviewData,
} from "next";
import Login from "./login";
import { useSelectUser } from "../hooks";
import { Sidebar, Friends } from "../components";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { io } from "socket.io-client";

const Home: NextPage = () => {
  const user = useSelectUser();
  const router = useRouter();

  return (
    <div className="grid place-items-center bg-background h-screen w-screen relative overflow-x-hidden">
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default Home;
