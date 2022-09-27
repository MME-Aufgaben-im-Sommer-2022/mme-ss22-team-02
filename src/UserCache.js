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

    async saveProfile(userId, deltaData) {
        await this._apiClient.saveProfile(deltaData);
        const newProfile = await this._apiClient.getProfile(userId);

        Object.entries(newProfile).forEach(value => {
            this._cache[userId][value[0]] = value[1];
        });
    }
}
