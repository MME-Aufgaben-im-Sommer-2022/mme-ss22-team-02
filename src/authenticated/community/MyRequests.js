import React from "react";
import {useParentCommunity} from "../../utils/context-utilities";
import {useSubscription} from "../../utils/hooks";
import RequestGrid from "./RequestGrid";

export default function MyRequests(){
    const community = useParentCommunity();
    const requests = useSubscription([], community.subscribeOwnedRequests.bind(community));

    return <RequestGrid requests={requests}/>;
}
