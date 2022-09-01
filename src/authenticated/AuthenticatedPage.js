import React from "react";
import {useApiClient} from "../ApiBridge";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import {Avatar, List, ListItem, ListItemButton} from "@mui/material";
import CommunityWrapper from "./CommunityWrapper";
import AddIcon from "@mui/icons-material/Add";

export default function AuthenticatedPage() {

    const bridge = useApiClient();

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
                <ListItem disablePadding sx={{ display: "block" }}>
                            <ListItemButton onClick={()=>bridge.createCommunity({name: "peter", color:"blue"})}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: "center",
                                    px: 2.5,
                                }}
                            >
                                <AddIcon
                                  sx={{
                                        minWidth: 0,
                                        mr: "auto",
                                        justifyContent: "center",
                                    }}
                                />

                            </ListItemButton>
                        </ListItem>
            </List>
        </Sidebar>
        <Box component={"main"} sx={{flexGrow:1, minHeight: "100vh"} }>
            <CommunityWrapper key={activeCommunityId} communityId={activeCommunityId}/>
        </Box >
    </Box>;

}
