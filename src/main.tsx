import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CultureMapApp } from "@/components/culture-map-app";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("The application root element is missing.");
}

createRoot(root).render(
  <StrictMode>
    <CultureMapApp />
  </StrictMode>,
);
