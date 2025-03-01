import { useEffect, useState } from "react";
import { fetchWeather } from "./api";

import WeatherDetails from "./WeatherDetails";
import WeatherForecast from "./WeatherForecast";
import ForecastTemperature from "./ForecastTemperature";
import TodayWeather from "./TodayWeather";
import AirConditions from "./AirConditions";

function ActualWeather() {
    const [weather, setWeather] = useState(null);
    const [forecastTemperature, setForecastTemperature] = useState(null);
    useEffect(() => {
        const loadWeather = async () => {
            try {
                const weatherData = await fetchWeather();
                setWeather(weatherData);
                console.log(weatherData)

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
                    date: day.date,
                    image_src: hour.condition.icon,
                    alt: hour.condition.text
                }))
        ) || [];

    }

    // const getConsole = () => {
    //     console.log("weather");
    //     console.log(weather);
    //     console.log(forecastTemperature);
    // }

    return (
        <div className="">
            {/* <h1>Actual Weather</h1>
            <button onClick={() => getConsole()}>getConsole</button> */}
            {weather && forecastTemperature ?
                <>
                    <div className="main-content">
                        
                    <TodayWeather weather={weather}></TodayWeather>
                    {/* <h1>========</h1> */}
                    <WeatherForecast forecast={weather.forecast}></WeatherForecast>
                    <AirConditions weather={weather}></AirConditions>
                    </div>
                    <div className="daily-forecast">
                    <ForecastTemperature forecastTemperature={forecastTemperature}></ForecastTemperature>
                    </div>
                </>
                : <p>Loading...</p>}
        </div>
    )
}

export default ActualWeather;