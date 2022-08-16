
import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import App from "./App.js";
import {WithAppWrite} from "./AppWriteBridge";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/system";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<React.StrictMode>
    <CssBaseline/>
    <ThemeProvider>
    <WithAppWrite>
        <App />
    </WithAppWrite>
    </ThemeProvider>
</React.StrictMode>);
