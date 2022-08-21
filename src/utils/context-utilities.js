import React, {useContext} from "react";

/**
 * @type {React.Context<import("../model/Community").Community>}
 */
const ParentCommunityContext = React.createContext(null);

export const ProvideParentCommunity = ParentCommunityContext.Provider;

export function useParentCommunity() {
    return useContext(ParentCommunityContext);
}
