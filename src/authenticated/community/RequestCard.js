import React, {useState} from "react";
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import OpenRequestModal from "../../components/modal/OpenRequestModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./RequestCard.css";
import {Spacer} from "../../components/Spacer";
import {useRequestData} from "../../utils/useRequestData";
import LoadingScreen from "../../utils/LoadingScreen";

export default function RequestCard({id, className}) {

    const [open, setOpen] = useState(false);
    const showAllItems = () => {
        setOpen(true);
    };

    const requestData = useRequestData(id);

    let body = <LoadingScreen/>;
    if(requestData) {
        body = <>
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
                subheader={requestData.getDate().toString()}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                </Typography>

                <Button size="small" onClick={showAllItems}>all Products</Button>
                <OpenRequestModal open={open} onClose={() => setOpen(false)} />
            </CardContent>

            <Spacer/>

            <CardActions className={"request-card-actions"}>
                <Button variant="outlined">Bring ich mit</Button>
            </CardActions>
        </>;
    }

    return (
        <Card className={className + " request-card"}>
            {body}
        </Card>
    );

}
