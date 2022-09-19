/*function taken from briancodex (2020) https://github.com/briancodex/react-todo-app-v1
  Source-Code: https://github.com/briancodex/react-todo-app-v1/blob/master/src/components/Todo.js
  on 20.08.2022
  Code was adjusted */

import React, { useState } from "react";
import RequestForm from "./RequestForm";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

const Article = ({ articles, removeArticle, updateArticle }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = value => {
    updateArticle(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <RequestForm edit={edit} onSubmit={submitUpdate} />;
  }

  return articles.map((article, index) => (
    <div key={index}>
      <Stack spacing={1} direction="row">
        <Box key={article.id} sx={{width: 290, marginTop:0.75, overflow:"auto" }} > {article.text} </Box>
        <div>
          <Button
          onClick={() => setEdit({ id: article.id, value: article.text })}
          >Edit</Button>
          <IconButton color="primary" aria-label="delete" size="small"
          onClick={() => removeArticle(article.id)}
          >
            <DeleteIcon fontSize="inherit"/>
          </IconButton>
        </div>
      </Stack>
    </div>
  ));
};

export default Article;
