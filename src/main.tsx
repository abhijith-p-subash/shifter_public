import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Flowbite } from "flowbite-react";
import { customTheme } from "./theme/theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Flowbite theme={{ theme: customTheme }}>
      <App />
    </Flowbite>
  </StrictMode>
);
