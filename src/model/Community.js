import {Observable} from "../utils/Observable";
import RequestData from "./RequestData";

export class Community extends Observable {
    _id;
    _loaded = false;

    /**
     * @type {import("../ApiClient").ApiClient}
     * @private
     */
    _apiClient = null;

    constructor(id, apiClient) {
        super();
        this._id = id;
        this._apiClient = apiClient;
    }

    getId() {
        return this._id;
    }

    isLoaded() {
        return this._loaded;
    }

    async loadBaseData() {

        await new Promise(resolve => setTimeout(resolve, 1000));

        this._loaded = true;

        this.emit("loaded");
    }

    async getOpenRequests() {
// asd
    }

    async addNewRequest({products, tags}) {
        await this._apiClient.createRequest({
            communityId: this._id,
            tags,
            products: products,
        });
    }
    async acceptRequest() {
// asd
    }
    async getMyRequests() {
// asd
    }

    async getMyAcceptedRequests() {
// asd
    }

    subscribeOpenRequests(callback) {
        return this._apiClient.subscribeOpenRequests(this._id, callback);
    }
    subscribeOwnedRequests(callback) {
        return this._apiClient.subscribeOwnedRequests(this._id, callback);
    }
    subscribeAcceptedRequests(callback) {
        return this._apiClient.subscribeAcceptedRequests(this._id, callback);
    }
}
