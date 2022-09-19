import React from "react";
import "./CommunityPage.css";
import {Tab, Tabs} from "@mui/material";
import MyRequests from "./MyRequests";
import OpenRequests from "./OpenRequests";

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <div className={"main-page"}>
        <div className={"community-body"}>
            <div className={"community-tabs"}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Open Requests" {...a11yProps(0)} />
                    <Tab label="My Requests" {...a11yProps(1)} />
                </Tabs>
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

    </div>;
}
