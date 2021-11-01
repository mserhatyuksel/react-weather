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
            `https://api.openweathermap.org/data/2.5/weather?q=${ctx.city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        ).then(({ data }) => {
            axios(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely&units=metric&lang=tr&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
            ).then(({ data }) => {
                setData(data);
                setIsLoading(false);
            });
        });
    }, [ctx]);
    const date = new Date();
    const getToday = (index) => {
        const days = [
            "Pazar",
            "Pazartesi",
            "Salı",
            "Çarşamba",
            "Perşembe",
            "Cuma",
            "Cumartesi",
        ];
        if (index > 6) index = index - 7;
        return days[index];
    };
    if (isLoading) {
        return (
            <div className={styles.container}>
                <h2>Yükleniyor...</h2>
            </div>
        );
    }
    return (
        <div className={styles.container}>
            <div className={`${styles.weather} ${styles.today}`}>
                <span className={styles.day}>Anlık Hava Durumu</span>
                <img
                    className={styles.img}
                    src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
                    alt={data.current.weather[0].description}
                />
                <div className={styles.current}>
                    {Math.round(data.current.temp)}&#8451;
                </div>
                <span className={styles.desc}>
                    {data.current.weather[0].description}
                </span>
            </div>

            {data.daily.map((day, i) => {
                return (
                    <div key={day.dt} className={styles.weather}>
                        <span className={styles.day}>
                            {getToday(date.getDay() + i)}
                        </span>
                        <img
                            className={styles.img}
                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                            alt={day.weather[0].description}
                        />
                        <div>
                            <span className={styles.current}>
                                {Math.round(day.temp.day)}&#8451;
                            </span>
                            <span className={styles.night}>
                                {Math.round(day.temp.night)}&#8451;
                            </span>
                        </div>
                        <span className={styles.desc}>
                            {day.weather[0].description}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default Weather;
