import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Flowbite } from "flowbite-react";
import { customTheme } from "./theme/theme";
import { BrowserRouter as Router } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderProvider } from "./core/context/LoaderContext.tsx";
import ModalProvider from "./core/context/ModalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Flowbite theme={{ theme: customTheme }}>
      <Router>
        <ModalProvider>
          <LoaderProvider>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            <App />
          </LoaderProvider>
        </ModalProvider>
      </Router>
    </Flowbite>
  </StrictMode>
);
