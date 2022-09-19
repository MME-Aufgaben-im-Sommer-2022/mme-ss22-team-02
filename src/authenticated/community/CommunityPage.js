import React, {useState} from "react";
import "./CommunityPage.css";
import {Button, Tab, Tabs} from "@mui/material";
import MyRequests from "./MyRequests";
import OpenRequests from "./OpenRequests";
import RequestModal from "../../components/modal/RequestModal";
import Icon from "@mdi/react";
import {mdiPlaylistPlus} from "@mdi/js";

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <div className={"main-page"}>
        <div className={"community-body"}>
            <div className={"community-tabs"}>
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
    </div>;
}
