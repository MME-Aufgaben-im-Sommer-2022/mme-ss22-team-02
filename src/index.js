
import React from "react";
import App from "./App.js";
import {WithAppWrite} from "./AppWriteBridge";

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<React.StrictMode>
    <WithAppWrite>
        <App />
    </WithAppWrite>
</React.StrictMode>);
