import { useContext, useEffect, useState } from "react";
import styles from "./Weather.module.css";
import CityContext from "../../context/city-context";
import axios from "axios";
const Weather = () => {
    const ctx = useContext(CityContext);
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios(
            `https://api.openweathermap.org/data/2.5/weather?q=${ctx.city}&appid=aa9a76ed3d5bb262a1e833e6738bbc42`
        ).then(({ data }) => {
            axios(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely&units=metric&lang=tr&appid=aa9a76ed3d5bb262a1e833e6738bbc42`
            ).then(({ data }) => {
                setData(data);
                setIsLoading(false);
            });
        });
    }, [ctx]);
    return (
        <div>
            {!isLoading && Math.round(data.current.temp)}
            {!isLoading && data.current.weather[0].description}

            <div>
                {!isLoading && (
                    <img
                        src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
                        alt=""
                    />
                )}
            </div>
        </div>
    );
};

export default Weather;
