import {useEffect, useState} from "react";

export function useEvent(observable, event, callback) {
    useEffect(() => {
        if(!observable) {
            return () => {/*empty*/};
        }
        observable.on(event, callback);

        return () => {
            observable.off(event, callback);
        };
    }, [observable, event, callback]);
}

export function usePromise(callback) {
    const [data, setData] = useState(null);

    useEffect(() => {
        callback().then(data => setData(data));
    });

    return data;
}

export function useSubscription(initial, subscribe, deps = []) {
    const [data, setData] = useState(initial);

    useEffect(() => {
        const subscription = subscribe((communities) => setData(communities));
        return () => subscription.cancel();
    }, deps);

    return data;
}
