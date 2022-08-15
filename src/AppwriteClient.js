import {Account, Client} from "appwrite";
import {Observable} from "./utils/Observable";

const client = new Client();

// Init your Web SDK
client
    .setEndpoint("https://appwrite.software-engineering.education/v1") // Your API Endpoint
    .setProject("62ed077218d8330d121c") // Your project ID
;

const account = new Account(client);


export class AppWriteBridge extends Observable {

    _user = null;
    _preparing = true;
    /**
     * @return {{} | null}
     */
    getUser() {
        return this._user;
    }

    async doLogin() {
        this.emit("authorizeChange");
    }

    isPreparing() {
        return this._preparing;
    }

    async prepare() {

        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
            this._user = await account.get();
        } catch (e) {
        }
        this._preparing = false;
        this.emit("prepared");
    }

}
