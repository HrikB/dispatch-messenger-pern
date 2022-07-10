import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
  PreviewData,
} from "next";
import Login from "./login";
import { useUser } from "../hooks";
import { Sidebar, Friends, Loading } from "../components";
import { useRouter } from "next/router";
import { validateAccessToken } from "../server/helpers/jwt";
import { Users } from "../server/entity";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../types";
import { useAppDispatch as useDispatch, setUserAction } from "../redux";
import { useEffect, useState } from "react";
import { createConnection } from "typeorm";
import { wrapper } from "../redux";
import ORMConfig from "../server/ormconfig";
import { ParsedUrlQuery } from "querystring";

interface HomeProps {
  user: User;
}

const Home: NextPage<HomeProps> = () => {
  const [user] = useUser();
  const router = useRouter();

  return (
    <div className="grid place-items-center bg-background h-screen w-screen relative overflow-x-hidden">
      {user === null ? (
        <Login />
      ) : (
        <div className="flex bg-black h-app w-app rounded-2xl shadow-app">
          <Sidebar />
          <Friends />
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  { user: User | null },
  ParsedUrlQuery,
  PreviewData
> = wrapper.getServerSideProps<{ user: User | null }>(
  (store) =>
    async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
      if (!context.req.cookies) return { props: { user: null } };
      const { accessToken } = context.req.cookies;
      if (!accessToken) return { props: { user: null } };
      const payload: string | JwtPayload | null = await validateAccessToken(
        accessToken
      );
      if (payload === null) return { props: { user: null } };
      const { sub: userId } = payload;
      const connection = await createConnection({
        ...ORMConfig,
        name: "next",
      });
      const userRepo = connection.getRepository(Users);
      const result: Users | undefined = await userRepo.findOne({
        id: userId as string,
      });
      connection.close();
      if (result === undefined) return { props: { user: null } };
      const user: User = { ...result, id: result?.id.toString() };

      store.dispatch(setUserAction(user));

      return { props: { user: user } };
    }
);

export default Home;
