

import React, {useState, useEffect, useRef, useMemo} from "react";
import Button from "@mui/material/Button";
import {Stack, TextField} from "@mui/material";

function RequestForm({value, onSubmit, size, placeholder, confirmationLabel, confirmationSettings}) {
    const [input, setInput] = useState(value ? value : "");

    const inputWidth = size || 350;
    const placeholderValue = placeholder || "Article";
    const confirmationLabelValue = confirmationLabel || "Add";

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    });

    const handleChange = e => {
        setInput(e.target.value);
    };
    const valid = useMemo(() => input && !/^\s*$/.test(input), [input]);

    const handleSubmit = e => {
        e.preventDefault();

        if(!valid) {
            return;
        }

        onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input,
        });

        setInput("");
    };

    return (
        <form onSubmit={handleSubmit} className='request-form'>
            <Stack spacing={1} direction="row" style={{paddingTop: 10}}>
                <TextField
                    style={{width: inputWidth}}
                    size="small" variant="outlined"
                    color='primary'
                    placeholder={placeholderValue}
                    value={input}
                    onChange={handleChange}
                    name='text'
                    ref={inputRef}
                />
                <Button disabled={!valid} onClick={handleSubmit} {...confirmationSettings}>
                    {confirmationLabelValue}
                </Button>
                <Button disabled={true}>{/*Just here for spacing*/}</Button>
            </Stack>
        </form>
    );
}

export default RequestForm;
