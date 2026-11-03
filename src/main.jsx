import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import App from "./App";

import "./assets/styles/globals.css";

const theme = createTheme({
    palette: {
        primary: {
            main: "#587aa7",
            dark: "#42658f",
        },
    },
    shape: {
        borderRadius: 8,
    },
    typography: {
        fontFamily: "inherit",
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ThemeProvider>
);
