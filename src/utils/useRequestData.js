import {useEffect, useState} from "react";
import {useParentCommunity} from "./context-utilities";

/**
 * @param id {string}
 * @return {import("../model/RequestData").RequestData | null}
 */
export function useRequestData(id) {

    const [data, setData] = useState(null);
    const community = useParentCommunity();

    useEffect(() => {
        community.getRequestData(id).then(value => {
            setData(value);
        });
    }, [id]);

    return data;
}
