import React, {useState} from "react";
import RequestForm from "./RequestForm";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {TextField} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const Article = ({article, removeArticle, updateArticle}) => {
    const [edit, setEdit] = useState(false);

    const submitUpdate = value => {
        updateArticle(article.id, value.text);
        setEdit(false);
    };

    if (edit) {
        return <RequestForm size={250} value={article.text} placeholder={"Artikelname ändern"} confirmationLabel={<SaveIcon/>} onSubmit={submitUpdate}/>;
    }

    return (
        <Stack spacing={1} direction="row" style={{paddingTop: 10}}>
            <TextField style={{width: 250, color: "black"}}
                       size="small"
                       variant="outlined"
                       color="primary"
                       disabled={true}
                       value={article.text} name="text"
            />
            <Button
                onClick={() => setEdit(true)}
            >
                <EditIcon />
            </Button>
            <Button
                variant={"outlined"}
                color="error"
                aria-label="delete"
                onClick={() => removeArticle(article.id)}
            >
                <DeleteIcon/>
            </Button>
        </Stack>
    );
};

export default Article;
