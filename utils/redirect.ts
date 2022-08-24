import type { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export const redirect = (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  url: string
) => {
  context.res.setHeader("Location", url);
  context.res.statusCode = 302;
  context.res.end();
};

export default redirect;
