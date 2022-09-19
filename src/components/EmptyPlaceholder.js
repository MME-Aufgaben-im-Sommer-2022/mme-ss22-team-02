import React from "react";
import "./EmptyPlaceholder.css";
import {Typography} from "@mui/material";
import {mdiPlaylistPlus} from "@mdi/js";
import Icon from "@mdi/react";

export function EmptyPlaceholder() {
    return <div className={"empty-placeholder"}>
        <Typography variant={"h5"} align={"center"}>
            Ups hier ist es aber leer!
        </Typography>
        <Typography variant={"body1"} align={"center"}>
            Erstelle doch einfach eine neue Anfrage (<Icon className={"icon-text"} size={1} path={mdiPlaylistPlus}/>)
        </Typography>
    </div>;
}
