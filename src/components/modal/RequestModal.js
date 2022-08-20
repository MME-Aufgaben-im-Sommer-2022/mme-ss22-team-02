import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ArticleList from "../../requests/ArticleList";


const RequestModal = ({open, onClose, title, subTitle}) => {

    const addRequest = () => {
        onClose();
        //TODO: article texte übernehmen zum erstellen eines Requests
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    return (
        <Modal open={open} onClose={onClose} >
            <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2">
                    New Request
                    {title}
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>

                    {subTitle}
                </Typography>
                <div>
                    <ArticleList />
                </div>
                <Box>
                    <Button variant={"contained"} onClick={onClose}>Cancel</Button>
                    <Button variant={"contained"} onClick={addRequest}>Publish</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default RequestModal;