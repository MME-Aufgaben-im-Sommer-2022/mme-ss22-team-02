import React from "react";
import RequestCard from "./RequestCard";

export default function OpenRequests (){
    const requests = [
        {
            id: "1",
            test: "abc",
        },
        {
            id: "2",
        },
        {
            id: "3",
        },
        {
            id: "4",
        },
    ];

    return <div>
        {
            requests.map((value) => <RequestCard key={value.id} {...value}/>)
        }

    </div>;

}
