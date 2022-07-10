import React, { useEffect } from "react";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
  PreviewData,
} from "next";
import Login from "./login";
import { useUser, useWillMount } from "../hooks";
import { Sidebar, Friends, Loading } from "../components";
import { useRouter } from "next/router";
import { validateAccessToken } from "../server/helpers/jwt";
import { Users } from "../server/entity";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../types";
import { useAppDispatch as useDispatch, setUserAction } from "../redux";
import { createConnection } from "typeorm";
import { wrapper } from "../redux";
import ORMConfig from "../server/ormconfig";
import { ParsedUrlQuery } from "querystring";
import { ServerResponse } from "http";

interface HomeProps {
  user: User;
}

const Home: NextPage<HomeProps> = () => {
  const mounted = useWillMount();
  const [user] = useUser();
  const router = useRouter();

  return (
    <div className="grid place-items-center bg-background h-screen w-screen relative overflow-x-hidden">
      <div className="flex bg-black h-app w-app rounded-2xl shadow-app">
        <Sidebar />
        <Friends />
      </div>
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
      console.log(context.req.cookies);
      if (Object.keys(context.req.cookies).length === 0)
        return redirectLogin(context);

      const { accessToken } = context.req.cookies;
      if (!accessToken) return redirectLogin(context);
      const payload: string | JwtPayload | null = await validateAccessToken(
        accessToken
      );
      if (payload === null) return redirectLogin(context);
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
      if (result === undefined) return redirectLogin(context);
      const user: User = { ...result, id: result?.id.toString() };

      store.dispatch(setUserAction(user));

      return { props: { user: user } };
    }
);

export const redirectLogin = (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  context.res.setHeader("Location", "/login");
  context.res.statusCode = 302;
  context.res.end();
  return { props: { user: null } };
};

export default Home;
