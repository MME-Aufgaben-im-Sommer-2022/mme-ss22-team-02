import React from "react";
import {useParentCommunity} from "../../utils/context-utilities";
import {useSubscription} from "../../utils/hooks";
import {EmptyPlaceholder} from "../../components/EmptyPlaceholder";
import {Container, Grid} from "@mui/material";
import RequestCard from "./RequestCard";

export default function MyRequests(){
    const community = useParentCommunity();
    const requests = useSubscription([], community.subscribeOwnedRequests.bind(community));

    if(requests.length === 0) {
        return <EmptyPlaceholder/>;
    }

    // noinspection JSValidateTypes
    return<Container>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                requests.map((value) => (
                    <Grid key={value.id} item xs={4} md={3}>
                        <RequestCard className={"grid-card"} {...value}/>
                    </Grid>
                ))
            }
        </Grid>
    </Container>;
}
