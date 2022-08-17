import {Account, Client} from "appwrite";
import {Observable} from "./utils/Observable";

const client = new Client();
const account = new Account(client);

// Init your Web SDK
client
    .setEndpoint("https://appwrite.software-engineering.education/v1") // Your API Endpoint
    .setProject("62ed077218d8330d121c") // Your project ID

;



export class AppWriteBridge extends Observable {

    _user = null;
    _preparing = true;
    /**
     * @return {{
     *     $id: string,
     *     $createdAt: number,
     *     $updatedAt: number,
     *     name: string,
     *     registration: number,
     *     status: boolean,
     *     passwordUpdate: number,
     *     email: string,
     *     phone: string,
     *     emailVerification: boolean,
     *     phoneVerification: boolean,
     *     prefs: {[key: string]: any},
     * } | null}
     */
    getUser() {
        return this._user;
    }

    async doLogin() {
        account.createOAuth2Session("google", window.location.href, window.location.href)
    }
    async doLogout() {
        await account.deleteSessions();
        this._user = null;
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
            // error ignored
        }

        this._preparing = false;
        this.emit("prepared");
    }

}
