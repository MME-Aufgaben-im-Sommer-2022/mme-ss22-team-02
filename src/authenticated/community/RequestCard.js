import React from "react";
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';




export default function RequestCard({id,test,date,className}){

        return (
        <Card className={className}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title= {id}
                subheader={date}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {test}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>

                <Button variant="outlined">Bring ich mit</Button>
            </CardActions>
        </Card>
        );



}