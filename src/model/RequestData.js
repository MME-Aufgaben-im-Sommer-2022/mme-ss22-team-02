export default class RequestData {
    _id;

    constructor(id) {
        this._id = id;
    }

    getDate() {
        return new Date();
    }
}
