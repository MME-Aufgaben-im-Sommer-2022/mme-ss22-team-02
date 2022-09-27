import React, {useState} from "react";
import {useApiClient} from "../ApiBridge";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import {IconButton, List, ListItem, ListItemButton} from "@mui/material";
import CommunityWrapper from "./CommunityWrapper";
import AddIcon from "@mui/icons-material/Add";
import CommunityButton from "./CommunityButton";
import {useSubscription} from "../utils/hooks";
import JoinOrCreateCommunityModal from "../components/modal/JoinOrCreateCommunityModal";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import ProfileModal from "../components/modal/ProfileModal";

export default function AuthenticatedPage() {

    const bridge = useApiClient();

    const communities = useSubscription([], bridge.subscribeJoinedCommunities);

    let [activeCommunityId, setActiveCommunityId] = useState(null);
    let [creatingCommunity, setCreatingCommunity] = useState(false);
    let [showSettings, setShowSettings] = useState(false);

    if(!activeCommunityId || communities.indexOf(activeCommunityId) === -1) {
        activeCommunityId = null; // Only temp for this frame
        if(communities.length > 0) {
            setActiveCommunityId(communities[0]);
        }
    }

    return <Box sx={{display:"flex", minHeight: "100%"}}>
        <Sidebar headerItems={[
            (<div key="1">
                <IconButton onClick={() => setShowSettings(true)}>
                    <SettingsIcon/>
                </IconButton>
            </div>),
            (<div key="2">
                <IconButton onClick={() => bridge.doLogout()} color="error">
                    <LogoutIcon/>
                </IconButton>
            </div>),
        ]}>
            <List>
                {
                    communities.map((communityId) => <CommunityButton
                        key={"community_"+communityId}
                        communityId={communityId}
                        active={communityId === activeCommunityId}
                        activate={() => setActiveCommunityId(communityId)}
                    />)
                }
                <ListItem disablePadding sx={{ display: "block" }}>
                    <ListItemButton onClick={()=>setCreatingCommunity(true)}
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
            {!!activeCommunityId && <CommunityWrapper key={activeCommunityId} communityId={activeCommunityId}/>}
        </Box >
        <JoinOrCreateCommunityModal open={creatingCommunity} onClose={() => setCreatingCommunity(false)}/>
        {showSettings && <ProfileModal open={showSettings} onClose={() => setShowSettings(false)} userId={bridge.getUser().uid}/>}
    </Box>;

}
