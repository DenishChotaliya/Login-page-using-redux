import "@/styles/globals.css";
import { Provider } from "react-redux";
import GetInitialData from "./compo/GetInitialData";
import { ToastContainer } from "react-toastify";
import { store } from "@/lib/Store";

import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="max-w-6xl mx-auto p-4">
        <Provider store={store}>
          <GetInitialData />
          <Component {...pageProps} />
          <ToastContainer />
        </Provider>
      </div>
    </>
  );
}
