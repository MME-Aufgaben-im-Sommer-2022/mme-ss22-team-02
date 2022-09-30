import React, {useState} from "react";
import {StyledModal} from "./BaseModal";
import Box from "@mui/material/Box";
import "./JoinOrCreateCommunityModal.css";
import {Alert, AlertTitle, Button, IconButton, TextField, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Divider from "@mui/material/Divider";
import LoadingScreen from "../../utils/LoadingScreen";
import {useApiClient} from "../../ApiBridge";
import {useIsLight} from "../../ThemeSystem";
import { CirclePicker } from "react-color";
import {getReadableColor} from "../../utils/colors";

export default function JoinOrCreateCommunityModal({open, onClose}) {
    const [type, setType] = useState(null);

    const resetClose = () => {
        onClose();
        setType(null);
    };

    let body;

    if(type === "CREATE") {
        body = <CreateCommunity back={() => setType(null)} close={onClose}/>;
    } else if(type === "JOIN") {
        body = <JoinCommunity back={() => setType(null)} close={onClose}/>;
    } else {
        body = <SelectType onSelect={type => setType(type)}/>;
    }

    const style = {
        padding: 0,
        width: "40%",
        height: "40%",
        minWidth: 400,
        minHeight: 400,
    };

    return (
        <StyledModal open={open} onClose={resetClose} sx={style}>
            {body}
        </StyledModal>
    );
}

function SelectType({onSelect}) {
    const lightMode = useIsLight();

    return <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{flexGrow: 1}} className={"selection-side top " + (lightMode ? "light" : "dark")} onClick={() => onSelect("JOIN")}>
            <Typography variant="h4">Gruppe Beitreten</Typography>
        </div>
        <Divider light />
        <div style={{flexGrow: 1}} className={"selection-side bot " + (lightMode ? "light" : "dark")} onClick={() => onSelect("CREATE")}>
            <Typography variant="h4">Gruppe Erstellen</Typography>
        </div>
    </Box>;
}

function CreateCommunity({back, close}) {

    const bride = useApiClient();
    const [name, setName] = useState("");
    const [color, setColor] = useState(() => "#4caf50");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const valid = name.length >= 3;

    const submit = (e) => {
        e.preventDefault();
        if(!valid) {
            return;
        }

        setLoading(true);
        bride.createCommunity({name, color}).then(value => {
            if (!value?.error) {
                close();
                return;
            }
            setError(value.error);
            setLoading(false);
        });
    };

    let buttonStyle = {};
    if(valid) {
        buttonStyle = {
            backgroundColor: color,
            color: getReadableColor(color),
        };
    }

    let body;

    if(loading) {
        body = <LoadingScreen/>;
    } else {
        body = <>
            <div>
                <IconButton onClick={back}>
                    <ArrowBackIcon/>
                </IconButton>
            </div>
            {
                error && (<Alert severity="error" style={{marginTop: 12, marginBottom: 12}}>
                    <AlertTitle>Fehler</AlertTitle>
                    {error}
                </Alert>)
            }
            <form onSubmit={submit} style={{marginTop: 12}}>
                <TextField fullWidth label="Name" focused value={name} onChange={e => setName(e.target.value.replace(/[^a-z0-9]/gi, ""))}/>
            </form>

            <Box sx={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center", marginTop: 3}}>
                <CirclePicker
                    color={color}
                    onChangeComplete={data => setColor(data.hex)}
                />
            </Box>
            <div style={{flexGrow: 1}}></div>
            <Box sx={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center"}}>
                <Button disabled={!valid} color={"success"} variant="contained" onClick={submit} style={buttonStyle}>Beitreten</Button>
            </Box>
        </>;
    }

    return <Box sx={{ display: "flex", flexDirection: "column", height: "100%", padding: 4 }}>
        {body}
    </Box>;
}

function JoinCommunity({back, close}) {

    const bride = useApiClient();
    const [code, setCode] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const valid = code.length > 0;

    const submit = (e) => {
        e.preventDefault();
        if(!valid) {
            return;
        }

        setLoading(true);
        bride.joinCommunity(code).then(value => {
            if (!value.error) {
                close();
                return;
            }
            setError(value.error);
            setLoading(false);
        });
    };

    let body;

    if(loading) {
        body = <LoadingScreen/>;
    } else {
        body = <>
            <div>
                <IconButton onClick={back}>
                    <ArrowBackIcon/>
                </IconButton>
            </div>
            {
                error && (<Alert severity="error" style={{marginTop: 12, marginBottom: 12}}>
                    <AlertTitle>Fehler</AlertTitle>
                    {error}
                </Alert>)
            }
            <form onSubmit={submit} style={{marginTop: 12}}>
                <TextField fullWidth label="Community Code" focused value={code} onChange={e => setCode(e.target.value.replace(" ", ""))}/>
            </form>
            <Alert severity="success" style={{marginTop: 12}}>
                <AlertTitle>Info</AlertTitle>
                Den Code erhältst du <strong>von einem Gruppen-Mitglied</strong>. Diesen findet er direkt neben dem Gruppen-Namen oben links!
            </Alert>
            <div style={{flexGrow: 1}}></div>
            <Box sx={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center"}}>
                <Button disabled={!valid} color={"success"} variant="contained" onClick={submit}>Beitreten</Button>
            </Box>
        </>;
    }

    return <Box sx={{ display: "flex", flexDirection: "column", height: "100%", padding: 4 }}>
        {body}
    </Box>;
}

