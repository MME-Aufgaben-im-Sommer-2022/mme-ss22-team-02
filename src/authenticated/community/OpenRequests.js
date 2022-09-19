import React from "react";
import RequestCard from "./RequestCard";
import "./CommunityPage.css";
import {Container, Grid} from "@mui/material";
import {useParentCommunity} from "../../utils/context-utilities";
import {useSubscription} from "../../utils/hooks";

export default function OpenRequests (){
    const community = useParentCommunity();
    const requests = useSubscription([], community.subscribeOpenRequests.bind(community));

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
