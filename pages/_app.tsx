import "../styles/globals.css";
import { Provider } from "urql";
// import { client } from "../urql";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <Provider value={client}>
    <ReduxProvider store={store}>
      <div className="h-screen w-screen flex justify-center items-center bg-black">
        <Component {...pageProps} />
      </div>
    </ReduxProvider>
    // </Provider>
  );
}

export default MyApp;
