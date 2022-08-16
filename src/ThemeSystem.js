import React, { useContext, useState } from "react";
import { createTheme, ThemeProvider, styled, useTheme } from '@mui/material/styles';

const ToggleLightContext = React.createContext(()=>{})

const lightTheme = createTheme({
    
});

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
});



export default function ThemeSystem(props){
    const [light, setLight] = useState(true);
    return <ToggleLightContext.Provider value={()=>setLight(!light)}>
        <ThemeProvider theme={light ? lightTheme : darkTheme}>
            {props.children}
        </ThemeProvider>
    </ToggleLightContext.Provider>

}

export function useToggleLight(){
    return useContext(ToggleLightContext);
}

export function useIsLight(){
    const theme = useTheme()
    return theme.palette.mode !== "dark";
}