import React from "react";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import Stack from "@mui/material/Stack";
import {StyledModal} from "./BaseModal";

const OpenRequestModal = ({open, onClose}) => {
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
                Alle Produkte
            </Typography>
            <Typography id="modal-description" variant="subtitle2">
                Produktliste hier einfügen
            </Typography>
            <Stack style={{marginTop: 210}} spacing={25} direction="row">
                <Button variant={"outlined"} onClick={onClose} size="small">Schließen</Button>
            </Stack>
        </StyledModal>
    );
};

export default OpenRequestModal;