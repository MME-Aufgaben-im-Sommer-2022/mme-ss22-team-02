import React from "react";
import {useAppWrite} from "../AppWriteBridge";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import {Avatar, List, ListItem, ListItemButton} from "@mui/material";

export default function AuthenticatedPage() {

    const bridge = useAppWrite();

    const communities = [
        {
            id: "1",
            shortName: "test",
            color: "orange",
        },
        {
            id: "2",
            shortName: "test",
            color: "purple",
        },
        {
            id: "3",
            shortName: "test",
            color: "green",
        },
    ];

    const activeCommunityId = "1";

    return <Box sx={{display:"flex", minHeight: "100%"}}>
        <Sidebar>
            <List>
                {
                    communities.map((community) => (
                        <ListItem key={"community_"+community.id} disablePadding sx={{ display: "block" }}>
                            <ListItemButton
                                selected={community.id === activeCommunityId}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: "center",
                                    px: 2.5,
                                }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: community.color,
                                        minWidth: 0,
                                        mr: "auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    {community.shortName}
                                </Avatar>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Sidebar>
        <Box component={"main"} sx={{flexGrow:1, minHeight: "100%"} }>
            Hello {bridge.getUser().name}
        </Box >
    </Box>;

}
