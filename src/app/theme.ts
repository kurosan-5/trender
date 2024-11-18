'use client'
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        secondary: {
            main: "#ff870f",
            light: "#ff962e",
            dark: "#d6700b",
            contrastText: "#FFFFFF",
        },
        primary: {
            main: "#000000",
            light: "#444444",
            dark: "#444444",
            contrastText: "#FFFFFF",
        }
    },
});

export default theme;