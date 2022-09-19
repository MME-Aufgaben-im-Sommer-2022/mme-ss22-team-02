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

export function useSubscription(subscribe, deps = []) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const subscription = subscribe((communities) => setData(communities));
        return () => subscription.cancel();
    }, deps);

    return data;
}