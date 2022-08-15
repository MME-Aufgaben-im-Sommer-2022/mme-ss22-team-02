import {useEffect} from "react";

export function useEvent(observable, event, callback) {
    useEffect(() => {
        observable.on(event, callback);

        return () => {
            observable.off(event, callback);
        };
    }, [observable, event, callback]);
}
