/*function taken from briancodex (2020) https://github.com/briancodex/react-todo-app-v1
  Source-Code: https://github.com/briancodex/react-todo-app-v1/blob/master/src/components/TodoForm.js
  on 20.08.2022
  Code was adjusted */

import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

function RequestForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
        id: Math.floor(Math.random() * 10000),
        text: input,
      });

    setInput("");
  };

  return (
  <form onSubmit={handleSubmit} className='request-form'> 
  {props.edit ? (<>
    <TextField style={{marginTop: 10, width: 300}} size="small" variant="outlined" color='primary' placeholder='Update your article'
    value={input} onChange={handleChange} name='text' ref={inputRef}
    />
    <Button style={{marginTop: 12}} onClick={handleSubmit}>
      Update
    </Button>
    </>
    ) : (
    <>
    <TextField style={{marginTop: 10, width: 350}} size="small" variant="outlined" color='primary' placeholder='Article'
    value={input} onChange={handleChange} name='text' ref={inputRef}
    />
    <Button style={{marginTop: 12}} onClick={handleSubmit}>
      Add
    </Button>
    </>
    )}
  </form>
  );
}

export default RequestForm;