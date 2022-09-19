export default class Subscription {

    /**
     * @type {function}
     * @private
     */
    _cancel = null;

    _cancelled = false;

    constructor(onCancel) {
        this._cancel = onCancel;
    }

    cancel() {
        if(this._cancelled) {
            return;
        }
        this._cancelled = true;
        this._cancel();
    }
}
