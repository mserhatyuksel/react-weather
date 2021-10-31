import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CityProvider } from "./context/city-context";
ReactDOM.render(
    <React.StrictMode>
        <CityProvider>
            <App />
        </CityProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
