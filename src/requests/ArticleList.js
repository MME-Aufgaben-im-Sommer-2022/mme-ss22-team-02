/*function taken from briancodex (2020) https://github.com/briancodex/react-todo-app-v1
  Source-Code: https://github.com/briancodex/react-todo-app-v1/blob/master/src/components/TodoList.js
  on 20.08.2022
  Code was adjusted */


import React, { useState } from 'react';
import Article from './Article';
import RequestForm from './RequestForm';

function ArticleList() {
  const [articles, setArticles] = useState([]);

  const addArticle = article => {
    if (!article.text || /^\s*$/.test(article.text)) {
      return;
    }

    const newArticles = [article, ...articles];

    setArticles(newArticles);
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

  return (
    <>
      <RequestForm onSubmit={addArticle} />
      <Article
        articles={articles}
        removeArticle={removeArticle}
        updateArticle={updateArticle}
      />
    </>
  );
}

export default ArticleList;