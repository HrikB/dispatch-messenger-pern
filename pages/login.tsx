import React, { useState } from "react";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
  PreviewData,
} from "next";
import { AppInfo, LoginBox, RegisterBox } from "../components";
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

const Login: NextPage = () => {
  const [registerModal, setRegisterModal] = useState<boolean>(false);

  return (
    <div className="h-screen w-screen bg-black flex flex-row justify-center items-center">
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

export const getServerSideProps: GetServerSideProps<
  {},
  ParsedUrlQuery,
  PreviewData
> = wrapper.getServerSideProps<{}>(
  (store) =>
    async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
      if (Object.keys(context.req.cookies).length === 0)
        return redirectFriends(context);

      const { accessToken } = context.req.cookies;
      if (!accessToken) return { props: {} };
      const payload: string | JwtPayload | null = await validateAccessToken(
        accessToken
      );
      if (payload === null) return { props: {} };
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
      if (result === undefined) return { props: {} };
      return redirectFriends(context);
    }
);

export const redirectFriends = (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  redirect(context, "/friends");
  return { props: { user: null } };
};

export default Login;
