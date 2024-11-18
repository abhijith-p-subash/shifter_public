import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Flowbite } from "flowbite-react";
import { customTheme } from "./theme/theme";
import { BrowserRouter as Router } from "react-router-dom";
import { LoaderProvider } from "./context/LoaderContext.tsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Flowbite theme={{ theme: customTheme }}>
      <Router>
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
      </Router>
    </Flowbite>
  </StrictMode>
);
