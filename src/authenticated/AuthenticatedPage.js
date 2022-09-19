import React, {useEffect, useState} from "react";
import {useApiClient} from "../ApiBridge";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import {Avatar, List, ListItem, ListItemButton} from "@mui/material";
import CommunityWrapper from "./CommunityWrapper";
import AddIcon from "@mui/icons-material/Add";
import CommunityButton from "./CommunityButton";

export default function AuthenticatedPage() {

    const bridge = useApiClient();

    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        const subscription = bridge.subscribeJoinedCommunities((communities) => setCommunities(communities));
        return () => subscription.cancel();
    }, []);

    const activeCommunityId = "1";

    return <Box sx={{display:"flex", minHeight: "100%"}}>
        <Sidebar>
            <List>
                {
                    communities.map((communityId) => <CommunityButton
                        key={"community_"+communityId}
                        communityId={communityId}
                        active={communityId === activeCommunityId}
                    />)
                }
                <ListItem disablePadding sx={{ display: "block" }}>
                            <ListItemButton onClick={()=>bridge.createCommunity({name: "peter", color:"#fcba03"})}
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
