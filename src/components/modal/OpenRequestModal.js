import React from "react";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import Stack from "@mui/material/Stack";
import {StyledModal} from "./BaseModal";
import Box from "@mui/material/Box";

const OpenRequestModal = ({open, onClose, products}) => {
    const style = {

        position: "absolute",
        top: "40%",
        left: "50%",
        width: 400,
        height: 400,
    };
    return (
        <StyledModal open={open} onClose={onClose} sx={style}>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Typography id="modal-title" variant="h6">
                    Alle gewünschten Artikel
                </Typography>
                <ul>
                    {
                        products.map((product, index) => <li key={index}>{product}</li>)
                    }
                </ul>
                <div style={{flexGrow: 1}}></div>
                <Stack >
                    <Button variant={"outlined"} onClick={onClose} size="small">Schließen</Button>
                </Stack>
            </Box>
        </StyledModal>
    );
};

export default OpenRequestModal;
