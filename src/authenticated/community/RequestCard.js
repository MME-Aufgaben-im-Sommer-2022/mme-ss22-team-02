import React, {useState} from "react";
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import OpenRequestModal from "../../components/modal/OpenRequestModal";





export default function RequestCard({id,test,date,className}){

    const [open, setOpen] = useState(false);
    const showAllItems = () => {
        setOpen(true);
    };
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
                        <ChatIcon />
                    </IconButton>
                }
                title= {id}
                subheader={date}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {test}
                </Typography>

                <Button size="small" onClick={showAllItems}>all Products</Button>
                <OpenRequestModal open={open} onClose={() => setOpen(false)} />
            </CardContent>
            <CardActions disableSpacing>
                <Button variant="outlined">Bring ich mit</Button>
            </CardActions>
        </Card>
        );



}