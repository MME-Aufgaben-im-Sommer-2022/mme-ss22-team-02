import { Client } from "appwrite";
import React, {useContext} from "react";

const client = new Client();

// Init your Web SDK
client
    .setEndpoint("https://appwrite.software-engineering.education/v1") // Your API Endpoint
    .setProject("62ed077218d8330d121c") // Your project ID
;

class AppWriteBridge {

}

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
