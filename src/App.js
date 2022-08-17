import React, {useState} from "react";
import "./App.css";
import {LoginPage} from "./anonymous/LoginPage";
import {useAppWrite} from "./AppWriteBridge";
import AuthenticatedPage from "./authenticated/AuthenticatedPage";
import {useEvent} from "./utils/hooks";
import Box from "@mui/material/Box";
import LoadingScreen from "./utils/LoadingScreen";

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

    return <Box sx={{backgroundColor: "background.paper", color: "text.primary", minWidth: "100vw", minHeight: "100vh"}}>
        {preparing ? <div style={{height: "100vh"}}><LoadingScreen label={"Preparing..."}/></div> : <Routing/>}
    </Box>;
}
