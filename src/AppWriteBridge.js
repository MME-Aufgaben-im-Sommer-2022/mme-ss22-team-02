import React, {useContext} from "react";
import {AppWriteBridge} from "./AppwriteClient";

const bridge = new AppWriteBridge();
const AppwriteContext = React.createContext(bridge);

export function WithAppWrite({children}) {
    return <AppwriteContext.Provider value={bridge}>
        {children}
    </AppwriteContext.Provider>;
}

export function useAppWrite() {
    return useContext(AppwriteContext);
}

// noinspection JSIgnoredPromiseFromCall
bridge.prepare();
