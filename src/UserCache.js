export class UserCache {
    /**
     * @type {import("./ApiClient").ApiClient}
     * @private
     */
    _apiClient;

    _cache = {};

    constructor(apiClient) {
        this._apiClient = apiClient;
    }

    async get(userId) {
        if(this._cache[userId]) {
            return this._cache[userId];
        }

        this._cache[userId] = await this._apiClient.getProfile(userId);
        return this._cache[userId];
    }
}
