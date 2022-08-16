import React from "react";
import {useAppWrite} from "../AppWriteBridge";
import Button from '@mui/material/Button';



export default function AuthenticatedPage() {
    
    const bridge = useAppWrite();

    return <div>
        Logged in as: {bridge.getUser().name}
        <Button variant={"contained"} onClick={()=> bridge.doLogout()}>Logout</Button>
    </div>;

}
