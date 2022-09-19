import {Avatar, ListItem, ListItemButton} from "@mui/material";
import React from "react";

export default function CommunityButton({communityId, active}) {
    return <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
            selected={active}
            sx={{
                minHeight: 48,
                justifyContent: "center",
                px: 2.5,
            }}
        >
            <Avatar
                sx={{
                    bgcolor: "green",
                    minWidth: 0,
                    mr: "auto",
                    justifyContent: "center",
                }}
            >
                {communityId}
            </Avatar>
        </ListItemButton>
    </ListItem>;
}
