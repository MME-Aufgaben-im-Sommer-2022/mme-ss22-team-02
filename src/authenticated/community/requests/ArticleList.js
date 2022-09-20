/*function taken from briancodex (2020) https://github.com/briancodex/react-todo-app-v1
  Source-Code: https://github.com/briancodex/react-todo-app-v1/blob/master/src/components/TodoList.js
  on 20.08.2022
  Code was adjusted */

import React from "react";
import Article from "./Article";
import RequestForm from "./RequestForm";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";

function ArticleList({articles, setArticles}) {

  const addArticle = article => {
    const newArticles = [article, ...articles];

    setArticles(newArticles);
  };

  const updateArticle = (articleId, text) => {
    setArticles(prev => prev.map(item => (item.id === articleId ? {...item, text} : item)));
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
      <RequestForm placeholder={"Wünsch dir was"} onSubmit={addArticle} confirmationLabel={<CheckIcon/>} confirmationSettings={{variant: "contained", color: "success"}}/>
      <Box sx={style}>
        {
          articles.map((article, index) => <Article
              key={index}
              article={article}
              removeArticle={removeArticle}
              updateArticle={updateArticle}
          />)
        }
      </Box>
    </>
  );
}

export default ArticleList;
