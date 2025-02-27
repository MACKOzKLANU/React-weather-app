import { useEffect, useState } from "react";
import { fetchWeather } from "./api";

import WeatherDetails from "./WeatherDetails";
import WeatherForecast from "./WeatherForecast";
import ForecastTemperature from "./ForecastTemperature";

function ActualWeather() {
    const [weather, setWeather] = useState(null);
    const [forecastTemperature, setForecastTemperature] = useState(null);
    useEffect(() => {
        const loadWeather = async () => {
            try {
                const weatherData = await fetchWeather();
                setWeather(weatherData);

            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        loadWeather();
    }, []);

    useEffect(() => {
        weather && setForecastTemperature(getFilteredForecast(weather));
    }, [weather])


    const getFilteredForecast = (weather) => {
        let currentHour = new Date().getHours();

        let todayDate = new Date().toISOString().split('T')[0];
        return weather?.forecast?.forecastday?.flatMap(day =>
            day.hour
                .filter(hour =>
                    day.date !== todayDate ||
                    currentHour <= parseInt(hour.time.split(" ")[1].split(":")[0])
                )
                .map(hour => ({
                    temp_c: hour.temp_c,
                    time: hour.time.split(" ")[1],
                    date: day.date
                }))
        ) || [];

    }

    return (
        <div>
            <h1>Actual Weather</h1>
            {weather && forecastTemperature ?
                <>
                    <WeatherDetails weather={weather}></WeatherDetails>
                    <WeatherForecast forecast={weather.forecast}></WeatherForecast>
                    <ForecastTemperature forecastTemperature={forecastTemperature}></ForecastTemperature>
                </>
                : <p>Loading...</p>}
        </div>
    )
}

export default ActualWeather;