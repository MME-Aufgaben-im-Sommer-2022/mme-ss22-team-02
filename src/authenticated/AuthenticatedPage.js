import React from "react";
import {useAppWrite} from "../AppWriteBridge";

export default function AuthenticatedPage() {
    const bridge = useAppWrite();
    return <div>
        Logged in as: {bridge.getUser().name}
    </div>;
}
