import React, {useState} from "react";
import {StyledModal} from "./BaseModal";
import {
    Fab,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    LinearProgress,
    OutlinedInput,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./ChatModal.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {usePromise, useSubscription} from "../../utils/hooks";
import {useParentCommunity} from "../../utils/context-utilities";
import {useApiClient} from "../../ApiBridge";
import {formatDate} from "../../utils/DateUtilities";

const style = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
};

const fabStyle = {
    position: "absolute",
    top: 16,
    left: 16,
    boxShadow: 7,
};

function ChatMessage({self, date, text, sentBy}) {
    const bridge = useApiClient();
    const author = usePromise(() => bridge.getUserCache().get(sentBy));

    return <div className={`message ${self ? "right" : "left"}`}>
        <div>
            <span className={"author"}>
                {author?.name}
            </span>
            <span className={"date"}>
                {formatDate(date)}
            </span>
        </div>

        <div className={`content ${self ? "right" : "left"}`}>
            {text}
        </div>
    </div>;
}

const ChatModal = ({requestId, onClose}) => {
    const community = useParentCommunity();
    const [messageValue, setMessageValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const messages = useSubscription([], (callback) => {
        return community.subscribeChatMessage(requestId, callback);
    }, [requestId]);

    const onSubmit = (e) => {
        e.preventDefault();

        if(loading) {
            return;
        }

        if(error) {
            setError(false);
        }

        setLoading(true);
        community.sendMessage(requestId, messageValue).then((data) => {
            if(data?.error) {
                setError(true);
                return;
            }
            setMessageValue("");
        }).catch(() => {
            setError(true);
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <StyledModal open={true} onClose={onClose} sx={style} className={"chat-wrapper"}>
            <Fab aria-label={"Zurück"} onClick={onClose} sx={fabStyle} color="error">
                <ArrowBackIcon/>
            </Fab>
            <div className={"container"}>
                {messages.map(value => (
                    <ChatMessage key={value.id} {...value}/>
                ))}
            </div>
            <form className={"form"} onSubmit={onSubmit}>
                <FormControl sx={{ m: 1}} variant="outlined" fullWidth disabled={loading} error={error}>
                    <InputLabel htmlFor="message-text-input">Message</InputLabel>
                    <OutlinedInput
                        id="message-text-input"
                        type="text"
                        value={messageValue}
                        onChange={event => setMessageValue(event.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton sx={{marginLeft: 2}} disabled={messageValue.length === 0 || loading} color="primary" onClick={onSubmit} onMouseDown={e => e.preventDefault()}>
                                    <SendIcon/>
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Message"
                    />
                    {loading && <LinearProgress />}
                    <FormHelperText id="outlined-weight-helper-text">{error ? "Nachricht konnte nicht versendet werden!" : ""}&nbsp;</FormHelperText>
                </FormControl>
            </form>
        </StyledModal>
    );
};

export default ChatModal;
