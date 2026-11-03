import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import App from "./App";

import "./assets/styles/globals.css";

const theme = createTheme({
    palette: {
        primary: {
            main: "#2563eb",
            dark: "#1d4ed8",
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
