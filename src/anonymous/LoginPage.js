import React from "react";
import {useAppWrite} from "../AppWriteBridge";

export function LoginPage() {
    const bridge = useAppWrite();
    return <div>
        <h1>
            Login
        </h1>
        <button onClick={() => {
            bridge.doLogin();
        }
        }>Do it</button>
    </div>;
}
