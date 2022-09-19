import React from "react";
import RequestCard from "./RequestCard";
import "./CommunityPage.css";
import {Container, Grid} from "@mui/material";

export default function OpenRequests (){
    const requests = [
        {
            id: "1",
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
