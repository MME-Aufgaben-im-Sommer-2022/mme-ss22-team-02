import React from "react";
import {useAppWrite} from "../AppWriteBridge";
import Icon from "@mdi/react";
import { mdiGoogle } from "@mdi/js";
import Sidebar from "../components/Sidebar";
import Box from '@mui/material/Box';

export function LoginPage() {
    const bridge = useAppWrite();
    return <Box sx={{display:"flex"}}>
    <Sidebar></Sidebar>
    <Box component={"main"} sx={{flexGrow:1} }>
        <h1>
            Login
        </h1>
        <button onClick={() => {
            bridge.doLogin();
        }
        }>Do it</button>
        <Icon path={mdiGoogle} size={2}/>
    </Box ></Box>;
}

