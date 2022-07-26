import React from "react";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import {styled} from "@mui/material/styles";
import {IconButton} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import {useIsLight, useToggleLight} from "../ThemeSystem";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== "open"})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",

        ...(!open && {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": closedMixin(theme),
        }),
    }),
);

export default function Sidebar(props) {
    const toggleLight = useToggleLight();
    const light = useIsLight();
    return <Drawer variant={"permanent"} open={false}>
        <DrawerHeader>
            <div>
                <div>
                    <IconButton onClick={() => toggleLight()}>
                        {!light ? <LightModeIcon/> : <DarkModeIcon/>}
                    </IconButton>
                </div>
                {props.headerItems}
            </div>
        </DrawerHeader>
        <Divider/>
        {props.children}
    </Drawer>;

}
