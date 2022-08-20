import React, {useState} from "react";
import { Button } from "@mui/material";
import RequestModal from "../../components/modal/RequestModal";

export default function MyRequests(){

    const [open, setOpen] = useState(false);
    
    const createRequest = () => {
        setOpen(true);
    };

    return <div>
        My Requests
        <Button variant={"contained"} onClick={createRequest}>Create new Request</Button>
        <RequestModal open={open} onClose={() => setOpen(false)} />
    </div>;
}