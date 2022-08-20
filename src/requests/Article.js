/*function taken from briancodex (2020) https://github.com/briancodex/react-todo-app-v1
  Source-Code: https://github.com/briancodex/react-todo-app-v1/blob/master/src/components/Todo.js
  on 20.08.2022
  Code was adjusted */

import React, { useState } from 'react';
import RequestForm from './RequestForm';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

const Article = ({ articles, removeArticle, updateArticle }) => {
    const [edit, setEdit] = useState({
      id: null,
      value: '',
    });
  
    const submitUpdate = value => {
      updateArticle(edit.id, value);
      setEdit({
        id: null,
        value: '',
      });
    };
  
    if (edit.id) {
      return <RequestForm edit={edit} onSubmit={submitUpdate} />;
    }
  
    return articles.map((article, index) => (
      <div key={index}>
        <div key={article.id}>
            {article.text}
      </div>
        
        <div className='icons'>
            <Button
            onClick={() => setEdit({ id: article.id, value: article.text })}
            className='edit-icon'
            >Edit</Button>
            <IconButton color="primary" aria-label="delete" size="small"
            onClick={() => removeArticle(article.id)}
            className='delete-icon'
            >
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </div>
      </div>
    ));
  };
  
  export default Article;