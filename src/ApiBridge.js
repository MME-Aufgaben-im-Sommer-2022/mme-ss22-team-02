import React, {useContext} from "react";
import {ApiClient} from "./ApiClient";

const bridge = new ApiClient();
const ApiContext = React.createContext(bridge);

export function WithApiClient({children}) {
    return <ApiContext.Provider value={bridge}>
        {children}
    </ApiContext.Provider>;
}

export function useApiClient() {
    return useContext(ApiContext);
}

// noinspection JSIgnoredPromiseFromCall
bridge.prepare();
