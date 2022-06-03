import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPageContext,
  NextPage,
  PreviewData,
} from "next";
import Login from "./login";
import { useSelectUser } from "../hooks";
import { Sidebar, Friends, Loading } from "../components";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { validateAccessToken } from "../server/helpers/jwt";
import { Users } from "../server/entity";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../types";
import { useAppDispatch as useDispatch, setUserAction } from "../redux";
import { useEffect } from "react";
import { createConnection } from "typeorm";
import ORMConfig from "../server/ormconfig";

interface HomeProps {
  user: User;
}

const Home: NextPage<HomeProps> = ({ user }: HomeProps) => {
  const dispatch = useDispatch();
  const userRedux = useSelectUser();
  const router = useRouter();

  useEffect(() => {
    if (user !== null) dispatch(setUserAction(user));
  }, []);

  if (userRedux === null && user !== null) return <Loading />;

  return (
    <div className="grid place-items-center bg-background h-screen w-screen relative overflow-x-hidden">
      {user === null && userRedux == null ? (
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.req.cookies) return { props: { user: null } };

  const { accessToken } = context.req.cookies;
  if (!accessToken) return { props: { user: null } };

  const payload: string | JwtPayload | null = await validateAccessToken(
    accessToken
  );

  if (payload === null) return { props: { user: payload } };

  const { sub: userId } = payload;

  const connection = await createConnection({
    ...ORMConfig,
    name: "next",
  });
  const userRepo = await connection.getRepository(Users);
  const result: Users | undefined = await userRepo.findOne({
    id: userId as string,
  });
  connection.close();
  if (result === undefined) return { props: { user: null } };

  const user: User = { ...result, id: result?.id.toString() };

  return {
    props: {
      user,
    }, // will be passed to the page component as props
  };
};

export default Home;
