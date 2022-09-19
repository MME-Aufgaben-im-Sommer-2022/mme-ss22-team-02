/*function taken from briancodex (2020) https://github.com/briancodex/react-todo-app-v1
  Source-Code: https://github.com/briancodex/react-todo-app-v1/blob/master/src/components/TodoList.js
  on 20.08.2022
  Code was adjusted */

import React, { useState } from "react";
import Article from "./Article";
import RequestForm from "./RequestForm";
import Box from "@mui/material/Box";

function ArticleList() {
  const [articles, setArticles] = useState([]);

  const addArticle = article => {
    if (!article.text || /^\s*$/.test(article.text)) {
      return;
    }

    const newArticles = [article, ...articles];

    setArticles(newArticles);
    console.log(...articles);
  };

  const updateArticle = (articleId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setArticles(prev => prev.map(item => (item.id === articleId ? newValue : item)));
  };

  const removeArticle = id => {
    const removedArticles = [...articles].filter(article => article.id !== id);

    setArticles(removedArticles);
  };

  const style = {
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 425,
    height: 180,
    bgcolor: "background.paper",
    p: 1,
    overflowY:"scroll",
  };

  return (
    <>
      <RequestForm onSubmit={addArticle} />
      <Box sx={style}>
        <Article
        articles={articles}
        removeArticle={removeArticle}
        updateArticle={updateArticle}
        />
      </Box>
    </>
  );
}

export default ArticleList;