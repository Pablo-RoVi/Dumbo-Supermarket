/**
 * React entry point for rendering the application.
 * Uses React StrictMode for additional development checks.
 */

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/layout/App";

// Creating a root instance for rendering
const root = createRoot(document.getElementById("root"));

// Rendering the application within React StrictMode
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
