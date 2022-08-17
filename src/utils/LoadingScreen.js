import React from "react";
import "./LoadingScreen.css";
import {CircularProgress, Typography} from "@mui/material";

export default function LoadingScreen({label}) {
    return <div className={"loading-screen wrapper"}>
        <CircularProgress size={"30vmin"}/>
        {label && <Typography variant={"h2"}>{label}</Typography>}
    </div>;
}
