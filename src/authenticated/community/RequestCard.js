import React, {useState} from "react";
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography, Box} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import OpenRequestModal from "../../components/modal/OpenRequestModal";
import "./RequestCard.css";
import {Spacer} from "../../components/Spacer";
import {useRequestData} from "../../utils/useRequestData";
import LoadingScreen from "../../utils/LoadingScreen";

export default function RequestCard(value) {

    const{id, className} = value;
    const listProducts = value.products;

    const [open, setOpen] = useState(false);
    const showAllItems = () => {
        setOpen(true);
    };

    const requestData = useRequestData(id);

    const style = {
        overflowY:"scroll",
      };

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

                <Box sx={style}>
                    {
                        listProducts.map(listProduct => (
                            <li key={listProduct} className="list-products" >
                                {listProduct}
                            </li>
                        ))
                    }
                </Box>

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
