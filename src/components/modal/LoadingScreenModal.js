import React from "react";
import {StyledModal} from "./BaseModal";
import LoadingScreen from "../../utils/LoadingScreen";

export default function LoadingScreenModal(){
    const style = {
        position: "absolute",
        background: "none",
        outline: "none",
        border: "none",
        boxShadow: 0,
    };
    return (
        <StyledModal open={true} sx={style}>
            <LoadingScreen/>
        </StyledModal>
    );
}
