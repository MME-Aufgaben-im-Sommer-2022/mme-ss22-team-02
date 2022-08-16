
import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import App from "./App.js";
import {WithAppWrite} from "./AppWriteBridge";
import { createRoot } from "react-dom/client";
import ThemeSystem from "./ThemeSystem.js";


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<React.StrictMode>
    <CssBaseline/>
    <ThemeSystem>
        <WithAppWrite>
            <App />
        </WithAppWrite>
    </ThemeSystem>
</React.StrictMode>);
