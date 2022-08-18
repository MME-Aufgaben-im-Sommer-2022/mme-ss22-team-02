import React from "react";

/**
 * @param community {require(../../model/Community)}
 * @return {JSX.Element}
 * @constructor
 */
export default function CommunityPage({community}) {

    return <div>
        community {community.getId()}
    </div>;
}
