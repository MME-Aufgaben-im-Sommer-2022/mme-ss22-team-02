import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import Stack from "@mui/material/Stack";



const OpenRequestModal = ({open, onClose}) => {
const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
return (
    <Modal open={open} onClose={onClose} >
        <Box sx={style}>
            <Typography id="modal-title" variant="h6">
                Alle Produkte
            </Typography>
            <Typography id="modal-description" variant="subtitle2">
                Produktliste hier einfügen
            </Typography>
            <Stack style={{marginTop: 210}} spacing={25} direction="row">
                <Button variant={"outlined"} onClick={onClose} size="small">Schließen</Button>
            </Stack>
        </Box>
    </Modal>
);
};

export default OpenRequestModal;