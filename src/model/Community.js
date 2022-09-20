import {Observable} from "../utils/Observable";

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

    async addNewRequest({products, tags}) {
        await this._apiClient.createRequest({
            communityId: this._id,
            tags,
            products: products,
        });
    }

    async acceptRequest(requestId) {
        await this._apiClient.acceptRequest({
            communityId: this._id,
            requestId,
        });
    }

    async closeRequest(requestId) {
        await this._apiClient.closeRequest({
            communityId: this._id,
            requestId,
        });
    }

    async leaveRequest(requestId) {
        await this._apiClient.leaveRequest({
            communityId: this._id,
            requestId,
        });
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
