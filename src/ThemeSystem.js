import React, { useContext, useState } from "react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

const ToggleLightContext = React.createContext(()=>{/* unused */});

const lightTheme = createTheme({

});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function getSavedMode() {
    return localStorage.getItem("light") === "true";
}
function setSavedMode(light) {
    localStorage.setItem("light", light ? "true" : "false");
}

export default function ThemeSystem(props){
    const [light, setLight] = useState(getSavedMode());
    return <ToggleLightContext.Provider value={()=> {
        setSavedMode(!light);
        setLight(!light);
    }}>
        <ThemeProvider theme={light ? lightTheme : darkTheme}>
            {props.children}
        </ThemeProvider>
    </ToggleLightContext.Provider>;

}

export function useToggleLight(){
    return useContext(ToggleLightContext);
}

export function useIsLight(){
    const theme = useTheme();
    return theme.palette.mode !== "dark";
}
