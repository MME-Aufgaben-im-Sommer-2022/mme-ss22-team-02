import React, {useEffect, useState} from "react";
import "./App.css";
import {LoginPage} from "./anonymous/LoginPage";
import {useAppWrite} from "./AppWriteBridge";
import AuthenticatedPage from "./authenticated/AuthenticatedPage";
import {useEvent} from "./utils/hooks";


function Routing() {
    const bridge = useAppWrite();
    const [authorized, setAuthorized] = useState(bridge.getUser() !== null);


    useEvent(bridge, "authorizeChange", () => setAuthorized(bridge.getUser() !== null));


    return authorized ? <AuthenticatedPage/> : <LoginPage/>;

}

export default function App() {
    const bridge = useAppWrite();

    const [preparing, setPreparing] = useState(bridge.isPreparing());
    useEvent(bridge, "prepared", () => setPreparing(bridge.isPreparing()));

    return preparing ? <h1>Loading</h1> : <Routing/>;
}
