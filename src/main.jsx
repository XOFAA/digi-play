import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import themeLight from "./theme/themeLight.jsx";
import { NavbarColorProvider } from "./context/NavbarColorContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <BrowserRouter>
        <NavbarColorProvider>
          <App />
        </NavbarColorProvider>

      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
