import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Flowbite } from "flowbite-react";
import { customTheme } from "./theme/theme";
import { BrowserRouter as Router } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderProvider1 } from "./core/context/LoaderContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Flowbite theme={{ theme: customTheme }}>
      <Router>
        <LoaderProvider1>
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
        </LoaderProvider1>
      </Router>
    </Flowbite>
  </StrictMode>
);
