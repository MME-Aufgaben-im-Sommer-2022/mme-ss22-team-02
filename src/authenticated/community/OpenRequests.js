import React from "react";
import RequestCard from "./RequestCard";
import "./CommunityPage.css";
import {Container, Grid} from "@mui/material";


export default function OpenRequests (){
    const requests = [
        {
            id: "1",
            test: "abc",
            date: "02.09.2022",
        },
        {
            id: "2",
            date: "05.09.2022",
        },
        {
            id: "3",
            date: "09.09.2022",
        },
        {
            id: "4",
            date: "31.08.2022",
        },
    ];

    return<Container>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
        {
            requests.map((value) => <Grid key={value.id} xs={4} md={3}><RequestCard className={"grid-card"} {...value}/></Grid>)
        }
        </Grid>
    </Container>;

}
