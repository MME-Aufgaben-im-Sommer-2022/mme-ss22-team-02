import {Observable} from "./utils/Observable";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirestore, onSnapshot, doc, getDoc, query, collection, where, orderBy } from "firebase/firestore";
import { getAuth, getRedirectResult, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signInWithRedirect, onAuthStateChanged } from "firebase/auth";
import Subscription from "./utils/Subscription";
import {UserCache} from "./UserCache";

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
const firestore = getFirestore(app);

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
    _cache;

    constructor() {
        super();

        // Subscribe to any authentication changes
        onAuthStateChanged(authentication, (user) => {
            this._user = user;
            this._userChecked = true;
            this.emit("authorizeChange");
        });
        this._cache = new UserCache(this);
    }

    /**
     * @return {import("firebase/auth").User | null}
     */
    getUser() {
        return this._user;
    }
    /**
     * @return {import("./UserCache").UserCache}
     */
    getUserCache() {
        return this._cache;
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

        return response.data;
    }

    async joinCommunity(communityId){
        const joinCommunity = httpsCallable(functions, "joinCommunity");

        const response = await joinCommunity(communityId);
        return response.data;
    }

    async leaveCommunity(communityId){
        const leaveCommunity = httpsCallable(functions, "leaveCommunity");
        await leaveCommunity(communityId);
    }

    async createRequest({communityId, tags, products}){
        const createRequest = httpsCallable(functions, "createRequest");

        const response = await createRequest({communityId, tags, products});

        console.log("Received", response.data);
    }

    async acceptRequest({communityId, requestId}){
        const acceptRequest = httpsCallable(functions, "acceptRequest");
        await acceptRequest({communityId, requestId});
    }

    async closeRequest({communityId, requestId}){
        const closeRequest = httpsCallable(functions, "closeRequest");

        await closeRequest({communityId, requestId});
    }

    async leaveRequest({communityId, requestId}){
        const leaveRequest = httpsCallable(functions, "leaveRequest");

        await leaveRequest({communityId, requestId});
    }

    async sendMessage({communityId, requestId, message}){
        const sendMessage = httpsCallable(functions, "sendMessage");

        await sendMessage({communityId, requestId, message});
    }
    async saveProfile(deltaData){
        const sendMessage = httpsCallable(functions, "saveProfile");

        await sendMessage(deltaData);
    }

    subscribeJoinedCommunities(callback) {

        const unsub = onSnapshot(doc(firestore, "users", authentication.currentUser.uid), (snapshot) => {
            callback(snapshot.data()?.communities || []);
        });

        return new Subscription(unsub);
    }
    subscribeOpenRequests(communityId, callback) {
        const q = query(collection(firestore, "communities", communityId, "requests"), where("state", "==", "OPEN"));
        const unsub = onSnapshot(q, (snapshot) => {
            const requests = [];
            snapshot.forEach((doc) => {
                requests.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            callback(requests);
        });

        return new Subscription(unsub);
    }
    subscribeOwnedRequests(communityId, callback) {
        const q = query(collection(firestore, "communities", communityId, "requests"), where("owner", "==", authentication.currentUser.uid));
        const unsub = onSnapshot(q, (snapshot) => {
            const requests = [];
            snapshot.forEach((doc) => {
                requests.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            callback(requests);
        });

        return new Subscription(unsub);
    }
    subscribeAcceptedRequests(communityId, callback) {
        const q = query(collection(firestore, "communities", communityId, "requests"), where("bringer", "==", authentication.currentUser.uid));
        const unsub = onSnapshot(q, (snapshot) => {
            const requests = [];
            snapshot.forEach((doc) => {
                requests.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            callback(requests);
        });

        return new Subscription(unsub);
    }
    subscribeChatMessage(communityId, requestId, callback) {
        const q = query(collection(firestore, "communities", communityId, "requests", requestId, "messages"), orderBy("sentAt", "desc"));
        const unsub = onSnapshot(q, (snapshot) => {
            const requests = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                requests.push({
                    id: doc.id,
                    self: data.sentBy === this.getUser().uid,
                    sentBy: data.sentBy,
                    date: data.sentAt.toDate(),
                    text: data.text,
                });
            });
            callback(requests);
        });

        return new Subscription(unsub);
    }

    async getCommunityData(communityId) {
        return await getDoc(doc(firestore, "communities", communityId)).then(value => ({
            id: value.id,
            ...value.data(),
        }));
    }

    async getProfile(userId) {
        return await getDoc(doc(firestore, "profiles", userId)).then(value => value.data());
    }
}
