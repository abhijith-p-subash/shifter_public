import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Flowbite } from "flowbite-react";
import { customTheme } from "./theme/theme";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Flowbite theme={{ theme: customTheme }}>
      <Router>
        <App />
      </Router>
    </Flowbite>
  </StrictMode>
);
