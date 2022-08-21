import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArticleList from "../../requests/ArticleList";
import Stack from "@mui/material/Stack";
import {StyledModal} from "./BaseModal";

const RequestModal = ({open, onClose}) => {

    const addRequest = () => {
        onClose();
        //TODO: article texte übernehmen zum erstellen eines Requests
    };

    const style = {

        position: "absolute",
        top: "40%",
        left: "50%",
        width: 400,
        height: 400,
      };
    return (
        <StyledModal open={open} onClose={onClose} sx={style}>
                <Typography id="modal-title" variant="h6">
                    New Request
                </Typography>
                <Typography id="modal-description" variant="subtitle2">
                    Add the articles you need to your request.
                </Typography>
                <div style={{marginTop: 10}}>
                    <ArticleList />
                </div>
                <Stack style={{marginTop: 210}} spacing={25} direction="row">
                    <Button variant={"outlined"} onClick={onClose} size="small">Cancel</Button>
                    <Button variant={"outlined"} onClick={addRequest} size="small">Publish</Button>
                </Stack>
        </StyledModal>
    );
};

export default RequestModal;
