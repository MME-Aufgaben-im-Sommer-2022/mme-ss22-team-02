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
    Link,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import OpenRequestModal from "../../components/modal/OpenRequestModal";
import "./RequestCard.css";
import {Spacer} from "../../components/Spacer";
import { usePromise } from "../../utils/hooks";
import { useApiClient } from "../../ApiBridge";
import LoadingScreenModal from "../../components/modal/LoadingScreenModal";
import {useParentCommunity} from "../../utils/context-utilities";
import ChatModal from "../../components/modal/ChatModal";
import {formatDate} from "../../utils/DateUtilities";

export default function RequestCard(value) {

    const itemsVisible = 3;
    const{id, className, products, createdAt, state} = value;

    const bridge = useApiClient();
    const community = useParentCommunity();
    const [open, setOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const owner = usePromise(() => bridge.getUserCache().get(value.owner));

    const showAllItems = () => {
        setOpen(true);
    };

    let myRequest = value.owner === bridge.getUser().uid;

    const acceptRequest = async () => {
        setLoading(true);
        await community.acceptRequest(id);
        setLoading(false);
    };
    const closeRequest = async () => {
        setLoading(true);
        await community.closeRequest(id);
        setLoading(false);
    };
    const leaveRequest = async () => {
        setLoading(true);
        await community.leaveRequest(id);
        setLoading(false);
    };

    let action;
    if(state === "IN_PROGRESS") {
        if(myRequest) {
            action = <Button color="success" variant="contained" onClick={closeRequest}>Erhalten</Button>;
        } else {
            action = <Button color="error" variant="outlined" onClick={leaveRequest}>Kann nicht mehr</Button>;
        }
    } else {
        if(myRequest) {
            action = <Button color="error" variant="outlined" onClick={closeRequest}>Abbrechen</Button>;
        } else {
            action = <Button variant="outlined" onClick={acceptRequest}>Bring ich mit</Button>;
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
                    <IconButton aria-label="settings" onClick={() => setChatOpen(true)}>
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
                {
                    loading && <LoadingScreenModal/>
                }
            </CardContent>

            <div style={{marginTop: 12}}></div>
            <Spacer/>

            <CardActions className={"request-card-actions"}>
                {action}
            </CardActions>
            {chatOpen && <ChatModal requestId={id} onClose={() => setChatOpen(false)}/>}
        </Card>
    );

}
