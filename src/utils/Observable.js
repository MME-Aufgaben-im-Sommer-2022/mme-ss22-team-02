export class Observable {
    /**
     *
     * @type {{[event: string]: function[]}}
     * @private
     */
    _listeners = {};

    on(event, listener) {
        let listeners = this._listeners[event];
        if(!listeners) {
            listeners = this._listeners[event] = [];
        }
        listeners.push(listener);
    }

    off(event, listener) {
        const listeners = this._listeners[event];
        if(!listeners) {
            return;
        }

        const index = listeners.indexOf(listener);
        if(index < 0) {
            return;
        }
        listeners.splice(index, 1);
    }

    emit(event, ...data) {
        this._listeners[event]?.forEach(listener => listener(...data));
    }
}
