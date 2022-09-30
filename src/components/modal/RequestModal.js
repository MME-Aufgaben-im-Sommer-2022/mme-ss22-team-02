import React, {useState} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {StyledModal} from "./BaseModal";
import ArticleList from "../../authenticated/community/requests/ArticleList";
import {useParentCommunity} from "../../utils/context-utilities";
import LoadingScreen from "../../utils/LoadingScreen";


const style = {

    position: "absolute",
    top: "40%",
    left: "50%",
    width: 500,
    height: 420,
};

export default function RequestModal({open, onClose}) {

    const [articles, setArticles] = useState([]);
    const community = useParentCommunity();
    const [saving, setSaving] = useState(false);

    const fullyClose = () => {
        setArticles([]);
        onClose();
    };

    const addRequest = () => {
        setSaving(true);
        let errored = false;
        community.addNewRequest({products: articles.map(value => value.text), tags: {}})
            .catch(() => errored = true)
            .finally(() => {
                setSaving(false);
                if(!errored) {
                    fullyClose();
                }
            });
    };

    if(saving) {
        return <StyledModal open={true} onClose={() => {/*Do nothing*/}} sx={style}>
            <LoadingScreen/>
        </StyledModal>;
    }

    return (
        <StyledModal open={open} onClose={onClose} sx={style}>
                <Typography id="modal-title" variant="h6">
                    Neue Anfrage
                </Typography>
                <Typography id="modal-description" variant="subtitle2">
                    Füge die gewünschten Artikel deiner Anfrage hinzu.
                </Typography>
                <div style={{marginTop: 10}}>
                    <ArticleList articles={articles} setArticles={setArticles}/>
                </div>
                <Stack style={{marginTop: 220}} spacing={35} direction="row">
                    <Button variant={"outlined"} onClick={onClose} size="small">Zurück</Button>
                    <Button disabled={articles.length === 0} variant={"outlined"} onClick={addRequest} size="small">Absenden</Button>
                </Stack>
        </StyledModal>
    );
}
