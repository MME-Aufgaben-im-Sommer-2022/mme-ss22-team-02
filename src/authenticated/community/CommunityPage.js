import React from "react";

/**
 * @param community {require(../../Community)}
 * @return {JSX.Element}
 * @constructor
 */
export default function CommunityPage({community}) {

    return <div>
        community {community.getId()}
    </div>;
}
