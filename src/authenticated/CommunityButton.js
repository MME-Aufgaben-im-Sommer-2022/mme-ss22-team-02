import {Avatar, ListItem, ListItemButton} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useApiClient} from "../ApiBridge";

export default function CommunityButton({communityId, active, activate}) {

    const [communityData, setCommunityData] = useState();

    const bridge = useApiClient();
    useEffect(() => {
        bridge.getCommunityData(communityId)
            .then(data => setCommunityData(data));
    }, [communityId]);

    if(!communityData) {
        return <></>;
    }

    return <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
            selected={active}
            sx={{
                minHeight: 48,
                justifyContent: "center",
                px: 2.5,
            }}
            onClick={() => !active && activate()}
        >
            <Avatar
                sx={{
                    bgcolor: communityData.color,
                    minWidth: 0,
                    mr: "auto",
                    justifyContent: "center",
                }}
            >
                {communityData.name.substring(0, 3).toUpperCase()}
            </Avatar>
        </ListItemButton>
    </ListItem>;
}
