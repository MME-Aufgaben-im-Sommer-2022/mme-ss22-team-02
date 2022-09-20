export class UserCache {
    /**
     * @type {import("./ApiClient").ApiClient}
     * @private
     */
    _apiClient;

    constructor(apiClient) {
        this._apiClient = apiClient;
    }

    async get(userId) {
        return {
            name: "Peter",
            profilePicture: "https://avatars.dicebear.com/api/bottts/peter.svg",
        };
    }
}
