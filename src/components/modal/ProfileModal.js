import React, {useEffect, useState} from "react";
import {StyledModal} from "./BaseModal";
import {useApiClient} from "../../ApiBridge";
import LoadingScreen from "../../utils/LoadingScreen";
import "./ProfileModal.css";
import {Button, TextField} from "@mui/material";
import {usePromise} from "../../utils/hooks";

const style = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "60%",
    padding: 0,
};

export default function ProfileModal({onClose, userId}) {
    const bridge = useApiClient();
    const [loading, setLoading] = useState(false);
    const owner = usePromise(() => bridge.getUserCache().get(userId));
    const [name, setName] = useState("");

    useEffect(() => {
        if(!owner) {
            return;
        }
        setName(owner.name);
    }, [owner]);

    if(!owner || loading) {
        return (
            <StyledModal open={open} onClose={onClose} sx={style} className="profile-modal">
                <LoadingScreen/>
            </StyledModal>
        );
    }

    const saveProfile = async () => {
        setLoading(true);
        await bridge.getUserCache().saveProfile(bridge.getUser().uid, {name});
        setLoading(false);
    };

    let validName = true;
    let nameError = "";
    if(!readonly) {
        if(name.length <= 3) {
            validName = false;
            nameError = "Mindestlänge 4";
        }
        if(name.length >= 20) {
            validName = false;
            nameError = "Maximallänge 19";
        }
        if(name.match(/\s+$/)) {
            validName = false;
            nameError = "Darf nicht mit einer leerstelle beginnen/enden";
        }
    }
    const readonly = userId !== bridge.getUser().uid;
    const touched = name !== owner.name;
    return (
        <StyledModal open={true} onClose={onClose} sx={style} className="profile-modal">
            <div className="profile-header">
                <h1>{owner.name}</h1>
            </div>

            <div className="profile-body">
                <TextField error={!validName} helperText={nameError} value={name} disabled={readonly} label="Benutzername" onChange={e => setName(e.target.value)}/>
                <div style={{flexGrow: 1}}></div>
                {!readonly &&
                    <div className="profile-buttons">
                        <div style={{flexGrow: 1}}></div>
                        <Button variant="outlined" disabled={!touched || !validName} onClick={saveProfile}>
                            Speichern
                        </Button>
                    </div>
                }
            </div>

        </StyledModal>
    );
}
