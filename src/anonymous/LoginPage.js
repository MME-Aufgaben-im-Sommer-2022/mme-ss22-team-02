import React from "react";
import {useApiClient} from "../ApiBridge";
import Icon from "@mdi/react";
import {mdiFacebook, mdiGithub, mdiGitlab, mdiGoogle} from "@mdi/js";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import {Container, IconButton, Typography} from "@mui/material";
import "./LoginPage.css";
import {useIsLight} from "../ThemeSystem";

const methods = [
    {
        icon: mdiGoogle,
        id: "google",
        color: "#DB4437",
    },
    {
        icon: mdiFacebook,
        id: "facebook",
        color: "#3b5998",
    },
    {
        icon: mdiGithub,
        id: "github",
        color: "#282424",
    },
    {
        icon: mdiGitlab,
        id: "gitlab",
        color: "#fc6d26",
    },
];

export function LoginPage() {
    const bridge = useApiClient();
    const light = useIsLight();

    return (
        <Box sx={{display:"flex", minHeight: "100%"}}>
            <Sidebar></Sidebar>
            <Box component={"main"} sx={{flexGrow:1, minHeight: "100%"} }>
                <Container className={"login-wrapper"}>
                    <Typography variant={"h1"} sx={{textDecoration: !light ? "underline" : "none"}}>
                        ShopForMe
                    </Typography>
                    <Typography style={{marginTop: 150}} variant={"h2"}>
                        Login with
                    </Typography>
                    <div>
                        {
                            methods.map(method => (
                                <IconButton className={"login-method"} key={method.id} sx={{backgroundColor: method.color}} onClick={() => {
                                    bridge.doOAuthLogin(method.id, method.scopes);
                                }}>
                                    <Icon path={method.icon} size={2}/>
                                </IconButton>
                            ))
                        }
                    </div>
                </Container>
            </Box >
        </Box>
    );
}

