import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React from "react";

const ModalBox = styled(Box, {})(({theme}) => ({
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    // border: "2px solid #000",
    position: "absolute",
    top: "40%",
    left: "50%",
    borderRadius: 12,
}));

export const StyledModal = ({open, onClose, children, sx}) => {

    const style = {
        boxShadow: 24,
        p: 4,
        ...sx,
    };
    return (
        <Modal open={open} onClose={onClose} >
            <ModalBox sx={style}>
                {children}
            </ModalBox>
        </Modal>
    );
};
