import React from "react";
import {useAppWrite} from "../AppWriteBridge";
import Icon from "@mdi/react"
import { mdiGoogle } from "@mdi/js"

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
        <Icon path={mdiGoogle} size={2}/> 
    </div>;
}
