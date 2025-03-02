import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ForecastTemperature from "./ForecastTemperature";

function WeatherDetails() {
    const [forecastTemperature, setForecastTemperature] = useState(null);

    const location = useLocation();
    const weather = useMemo(() => location.state || {}, [location.state]);

    useEffect(() => {
        weather && setForecastTemperature(getFilteredForecast(weather));
    }, [weather])

    const getFilteredForecast = (weather) => {
        return weather?.hour.flatMap(hour => ({

            temp_c: hour.temp_c,
            time: hour.time.split(" ")[1],
            date: weather.date,
            image_src: hour.condition.icon,
            alt: hour.condition.text
        }))
    }

    if (!weather) {
        return <p>No weather data available</p>;
    }

    return (
        <div className="weather-details" key={"das"}>
            <h1>Actual Weather</h1>

            <p>Date: {weather.date}</p>
            <img src={`https:${weather.day.condition.icon}`} alt="Weather icon" />
            <p>{weather.day.condition.text}</p>
            <p>Temperature: {weather.day.maxtemp_c}°C / {weather.day.mintemp_c}°C</p>
            <p>Average temperature {weather.day.avgtemp_c}°C</p>
            <p>Humidity: {weather.day.avghumidity}%</p>
            <p>max Wind: {weather.day.maxwind_kph} km/h</p>
            <p>visibility: {weather.day.avgvis_km} km</p>
            <p>uv: {weather.day.uv}</p>

            {forecastTemperature &&
                <ForecastTemperature forecastTemperature={forecastTemperature}></ForecastTemperature>
            }
        </div>

    )
}

export default WeatherDetails;
