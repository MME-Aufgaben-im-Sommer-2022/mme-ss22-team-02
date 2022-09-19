import {Observable} from "./utils/Observable";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getAuth, getRedirectResult, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signInWithRedirect, onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDrCBQqtoIo0jg2-r8nLSGchkUfCh6eWvo",
    authDomain: "shopforme-f6d18.firebaseapp.com",
    projectId: "shopforme",
    storageBucket: "shopforme.appspot.com",
    messagingSenderId: "344438797329",
    appId: "1:344438797329:web:0d76e8fded64cc07122db0",
    measurementId: "G-KTBPVSX65Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const functions = getFunctions(app);

getRedirectResult(authentication)
    .then((result) => {
        const user = result.user;
        console.log("Got", user);
    }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    if(errorCode === "auth/account-exists-with-different-credential") {
        // TODO show error account email already registered for another provider
    }

    console.log("Err", errorMessage, errorCode);
});

export class ApiClient extends Observable {

    /**
     * @type {import("firebase/auth").User | null}
     * @private
     */
    _user = null;
    _userChecked = false;
    _preparing = true;

    constructor() {
        super();

        // Subscribe to any authentication changes
        onAuthStateChanged(authentication, (user) => {
            this._user = user;
            this._userChecked = true;
            this.emit("authorizeChange");
        });
    }


    /**
     * @return {import("firebase/auth").User | null}
     */
    getUser() {
        return this._user;
    }

    async doOAuthLogin(type = "google") {
        let provider;
        switch (type) {
            case "google":
                provider = new GoogleAuthProvider();
                break;
            case "github":
                provider = new GithubAuthProvider();
                break;
            case "gitlab":
                provider = new GoogleAuthProvider();
                break;
            case "facebook":
                provider = new FacebookAuthProvider();
                break;
            default: break;
        }

        await signInWithRedirect(authentication, provider);
    }
    async doLogout() {
        await authentication.signOut();
        this._user = null;
        this.emit("authorizeChange");
    }

    isPreparing() {
        return this._preparing;
    }

    async prepare() {
        while (!this._userChecked) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        this._preparing = false;
        this.emit("prepared");
    }

    async createCommunity({name, color}){
        const createCommunity = httpsCallable(functions, "createCommunity");

        const response = await createCommunity({color,name});

        console.log("Received", response.data);
    }

    async joinCommunity({firestore, communityDoc, communitySnap, communityData}){
        const joinCommunity = httpsCallable(functions, "joinCommunity");

        const response = await joinCommunity({firestore, communityDoc, communitySnap, communityData});

        console.log("Received", response.data);
    }

    async leaveCommunity({firestore, communityDoc, communitySnap, communityData}){
        const leaveCommunity = httpsCallable(functions, "leaveCommunity");

        const response = await leaveCommunity({firestore, communityDoc, communitySnap, communityData});

        console.log("Received", response.data);
    }


    async createRequest({communityId, tags, products}){
        const createRequest = httpsCallable(functions, "createRequest");

        const response = await createRequest({communityId, tags, products});

        console.log("Received", response.data);
    }

    async acceptRequest({communityId, requestId}){
        const acceptRequest = httpsCallable(functions, "acceptRequest");

        const response = await acceptRequest({communityId, requestId});

        console.log("Received", response.data);
    }

    async closeRequest({communityId, requestId}){
        const closeRequest = httpsCallable(functions, "closeRequest");

        const response = await closeRequest({communityId, requestId});

        console.log("Received", response.data);
    }



}
