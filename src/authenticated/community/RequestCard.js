import React, {useState} from "react";
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography, Box} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import OpenRequestModal from "../../components/modal/OpenRequestModal";
import "./RequestCard.css";
import {Spacer} from "../../components/Spacer";
import { usePromise } from "../../utils/hooks";
import { useApiClient } from "../../ApiBridge";
/**
 *
 * @param {Date} date
 */
function formatDate(date){

    return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
}

export default function RequestCard(value) {

    const{className, products, createdAt} = value;
    const bridge = useApiClient();

    const [open, setOpen] = useState(false);
    const showAllItems = () => {
        setOpen(true);
    };


    const owner = usePromise(() => bridge.getUserCache().get(value.owner));

    const style = {
        overflowY:"scroll",
      };

    return (
        <Card className={className + " request-card"}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        {owner ? <img src={owner.profilePicture}/> : "?"}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <ChatIcon />
                    </IconButton>
                }
                title= {owner?.name || ""}
                subheader={formatDate(createdAt.toDate())}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                </Typography>

                <Box sx={style}>
                    {
                        products.map(listProduct => (
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
        </Card>
    );

}
