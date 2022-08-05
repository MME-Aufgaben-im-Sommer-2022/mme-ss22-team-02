
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import {WithAppWrite} from "./AppWriteBridge";

ReactDOM.render(<React.StrictMode>
    <WithAppWrite>
        <App />
    </WithAppWrite>
</React.StrictMode>, document.getElementById("root"));
