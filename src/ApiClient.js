import {Account, Client,Functions} from "appwrite";
import {Observable} from "./utils/Observable";

const client = new Client();
const account = new Account(client);
const functions = new Functions(client);

// Init your Web SDK
client
    .setEndpoint("https://appwrite.software-engineering.education/v1") // Your API Endpoint
    .setProject("62ed077218d8330d121c") // Your project ID

;



export class ApiClient extends Observable {

    /**
     * @type {{
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
     * }}
     * @private
     */
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

    async doOAuthLogin(type = "google", scopes) {
        account.createOAuth2Session(type, window.location.href, window.location.href, scopes);
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
        try {
            this._user = await account.get();
            console.log(this._user);
        } catch (e) {
            // error ignored
        }

        this._preparing = false;
        this.emit("prepared");
    }

    async createCommunity({name, color}){
        const response = await functions.createExecution("createCommunity", JSON.stringify({color,name}), false);
        console.log(response);
    }


}
