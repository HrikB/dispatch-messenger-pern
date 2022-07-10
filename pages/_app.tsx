import "../styles/globals.css";
import { Provider } from "urql";
// import { client } from "../urql";
import { wrapper } from "../redux";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <Component {...pageProps} />
    </div>
  );
}

export default wrapper.withRedux(MyApp);
