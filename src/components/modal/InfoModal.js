import React, {useEffect, useState} from "react";
import {StyledModal} from "./BaseModal";
import {useApiClient} from "../../ApiBridge";
import {useParentCommunity} from "../../utils/context-utilities";
import LoadingScreen from "../../utils/LoadingScreen";
import "./InfoModal.css";
import {getReadableColor} from "../../utils/colors";
import {Button} from "@mui/material";

const style = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "60%",
    padding: 0,
};

export default function InfoModal({open, onClose}) {
    const bridge = useApiClient();
    const community = useParentCommunity();
    const [communityData, setCommunityData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        bridge.getCommunityData(community.getId())
            .then(data => setCommunityData(data));
    }, [community.getId()]);

    const leaveCommunity = async () => {
        setLoading(true);
        await community.leave();
        setLoading(false);
    };

    if(!communityData || loading) {
        return (
            <StyledModal open={open} onClose={onClose} sx={style}>
                <LoadingScreen/>
            </StyledModal>
        );
    }

    return (
        <StyledModal open={open} onClose={onClose} sx={style} className="info-modal">
            <div className="info-header" style={{backgroundColor: communityData.color}}>
                <h1 style={{color: getReadableColor(communityData.color)}}>{communityData.name}</h1>
            </div>

            <div className="info-body">
                <div style={{flexGrow: 1}}></div>
                <div className="info-buttons">
                    <div style={{flexGrow: 1}}></div>
                    <Button variant="outlined" color="error" onClick={leaveCommunity}>
                        Leave Community
                    </Button>
                </div>
            </div>

        </StyledModal>
    );
}
