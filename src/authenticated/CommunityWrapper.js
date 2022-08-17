import React, {useEffect, useState} from "react";
import {Community} from "../Community";
import LoadingScreen from "../utils/LoadingScreen";
import {useEvent} from "../utils/hooks";
import CommunityPage from "./community/CommunityPage";

/**
 * @param communityId
 * @return {null | Community}
 */
function useCommunity(communityId) {
    const [community, setCommunity] = useState(null);
    useEffect(() => {
        const com = new Community(communityId);
        // noinspection JSIgnoredPromiseFromCall
        com.loadBaseData();
        setCommunity(com);
    }, [communityId]);
    return community;
}

export default function CommunityWrapper({communityId}) {
    const community = useCommunity(communityId);
    const [toggle, setToggle] = useState(false);
    useEvent(community, "loaded", () => {
        console.log("invoked");
        setToggle(!toggle);
    });

    if(!community || !community.isLoaded()) {
        return <LoadingScreen/>;
    }

    return <CommunityPage community={community}/>;
}
