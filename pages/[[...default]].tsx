import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
  PreviewData,
} from "next";
import { Sidebar, Friends } from "../components";
import { validateAccessToken } from "../server/helpers/jwt";
import { Users } from "../server/entity";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../types";
import { setUserAction } from "../redux";
import { createConnection } from "typeorm";
import { wrapper } from "../redux";
import ORMConfig from "../server/ormconfig";
import { ParsedUrlQuery } from "querystring";
import { redirect } from "../utils";

interface HomeProps {
  user: User;
}

const DynamicSidebar = dynamic(() => import("../components/Sidebar"), {
  suspense: true,
});

const DynamicFriends = dynamic(() => import("../components/Friends"), {
  suspense: true,
});

const Home: NextPage<HomeProps> = () => {
  return (
    <div className="grid place-items-center bg-background h-screen w-screen relative overflow-x-hidden">
      <div className="flex bg-black h-app w-app rounded-2xl shadow-app">
        {/* <Suspense fallback={`Loading...`}> */}
        <Sidebar />
        <Friends />
        {/* </Suspense> */}
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

      if (!context.req.url?.startsWith("/t/") && context.req.url !== "/friends")
        redirect(context, "/friends");

      store.dispatch(setUserAction(user));

      return { props: { user: user } };
    }
);

export const redirectLogin = (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  redirect(context, "/login");
  return { props: { user: null } };
};

export default Home;
