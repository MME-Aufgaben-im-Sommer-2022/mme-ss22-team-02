import React, {useState} from "react";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Typography,
    Box,
    Link, ButtonGroup,
} from "@mui/material";
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

    let minutes = date.getMinutes();
    if(minutes < 10) {
        minutes = "0"+ minutes;
    }
    let month = date.getMonth()+1;

    if(month < 10) {
        month = "0"+ month;
    }

    return `${date.getHours()}:${minutes} ${date.getDate()}.${month}.${date.getFullYear()}`;
}

export default function RequestCard(value) {

    const itemsVisible = 3;
    const{className, products, createdAt, state} = value;

    const bridge = useApiClient();
    const [open, setOpen] = useState(false);
    const owner = usePromise(() => bridge.getUserCache().get(value.owner));

    const showAllItems = () => {
        setOpen(true);
    };

    let myRequest = value.owner === bridge.getUser().uid;
    let action = null;

    if(state === "IN_PROGRESS") {
        if(myRequest) {
            action = <ButtonGroup aria-label="button group">
                <Button color="success" variant="contained">Erhalten</Button>
                <Button color="error">Abbrechen</Button>
            </ButtonGroup>;
        } else {
            action = <Button color="error" variant="outlined">Kann nicht mehr</Button>;
        }
    } else {
        if(myRequest) {
            action = <Button color="error" variant="outlined">Abbrechen</Button>;
        } else {
            action = <Button variant="outlined">Bring ich mit</Button>;
        }
    }

    return (
        <Card className={className + " request-card"} sx={{ boxShadow: 4 }}>
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
            <CardContent style={{height: 100}}>
                <Typography variant="body2" color="text.secondary">
                </Typography>

                <Box>
                    {
                        products.slice(0, itemsVisible).map((listProduct, index) => (
                            <li key={index} className="list-products" >
                                {listProduct}
                            </li>
                        ))
                    }
                    {products.length > itemsVisible && <li>
                        <Link size="small" style={{cursor: "pointer"}} onClick={showAllItems}>mehr...</Link>
                    </li>}
                </Box>
                <OpenRequestModal products={products} open={open} onClose={() => setOpen(false)} />
            </CardContent>

            <div style={{marginTop: 12}}></div>
            <Spacer/>

            <CardActions className={"request-card-actions"}>
                {action}
            </CardActions>
        </Card>
    );

}
