import React from "react";
import RequestCard from "./RequestCard";
import "./CommunityPage.css";
import {Container, Grid} from "@mui/material";
import {EmptyPlaceholder} from "../../components/EmptyPlaceholder";

export default function RequestGrid ({requests}){

    if(requests.length === 0) {
        return <EmptyPlaceholder/>;
    }

    // noinspection JSValidateTypes
    return<Container>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                requests.map((value) => (
                    <Grid key={value.id} item xs={4} md={3} style={{marginTop: 20}}>
                        <RequestCard className={"grid-card"} {...value}/>
                    </Grid>
                ))
            }
        </Grid>
    </Container>;

}
