import React from "react";
import "./CommunityPage.css";
import {useParentCommunity} from "../../utils/context-utilities";
import {useSubscription} from "../../utils/hooks";
import RequestGrid from "./RequestGrid";

export default function OpenRequests (){
    const community = useParentCommunity();
    const accepted = useSubscription([], community.subscribeAcceptedRequests.bind(community));
    const requests = useSubscription([], community.subscribeOpenRequests.bind(community));

    return <RequestGrid requests={[...accepted, ...requests]}/>;
}
