import React, {useEffect, useState} from "react";
import "./CommunityPage.css";
import {Button, Tab, Tabs} from "@mui/material";
import MyRequests from "./MyRequests";
import OpenRequests from "./OpenRequests";
import RequestModal from "../../components/modal/RequestModal";
import Icon from "@mdi/react";
import {mdiPlaylistPlus} from "@mdi/js";
import {useApiClient} from "../../ApiBridge";
import {useParentCommunity} from "../../utils/context-utilities";
import InfoIcon from "@mui/icons-material/Info";
import InfoModal from "../../components/modal/InfoModal";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tab panel-${index}`,
    };
}
function TabPanel({value, index, children}){
    return <div hidden={value!== index}>
        {value===index && children}
    </div>;
}
/**
 * @param community {import('../../model/Community').Community}
 * @return {JSX.Element}
 * @constructor
 */
export default function CommunityPage() {
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = useState(false);
    const [details, setShowDetails] = useState(false);
    const community = useParentCommunity();

    const [communityData, setCommunityData] = useState();

    const bridge = useApiClient();
    useEffect(() => {
        bridge.getCommunityData(community.getId())
            .then(data => setCommunityData(data));
    }, [community.getId()]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <div className={"main-page"}>
        <div className={"community-body"}>
            <div className={"community-tabs"}>

                <Button variant={"outlined"} onClick={() => setShowDetails(true)} sx={{
                    position: "absolute",
                    left: 12 + 64,
                    height: 64,
                    top: 4,
                }}>
                    <InfoIcon sx={{marginRight: 2}}/>
                    {communityData?.name || "..."}
                </Button>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Offene Anfragen" {...a11yProps(0)} />
                    <Tab label="Meine Anfragen" {...a11yProps(1)} />
                </Tabs>
                <Button variant={"outlined"} onClick={() => setOpen(true)} sx={{
                    position: "absolute",
                    width: 64,
                    height: 64,
                    right: 12,
                    top: 4,
                }}>
                    <Icon path={mdiPlaylistPlus}></Icon>
                </Button>
            </div>
            <TabPanel value={value} index={0}>
                <OpenRequests/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MyRequests/>
            </TabPanel>

        </div>
        <div>
            {/* add MemberList here if needed */}
        </div>
        <RequestModal open={open} onClose={() => setOpen(false)} />
        <InfoModal open={details} onClose={() => setShowDetails(false)}/>
    </div>;
}
