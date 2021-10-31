import { useContext } from "react";
import styles from "./Weather.module.css";
import CityContext from "../../context/city-context";
const Weather = () => {
    const ctx = useContext(CityContext);
    return <div>{ctx.city}</div>;
};

export default Weather;
