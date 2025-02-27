import { useEffect, useState } from "react";

function ActualWeather() {
    const [weather, setWeather] = useState(null);
    const [forecastWeather, setForecastWeather] = useState(null);
    const [forecastTemperature, setForecastTemperature] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const weatherData = await fetchWeather();
                setWeather(weatherData);

            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        weather && setForecastTemperature(fetchForecastTemperature());
    }, [weather])

    const fetchWeather = async () => {
        try {
            let request = await fetch("http://api.weatherapi.com/v1/forecast.json?key=77950a756080419794b91033252602&q=LODZ&days=3&aqi=no&alerts=no", {
                method: 'GET', // Optional, as GET is the default method
            });
            let response = await request.json();
            return response;
        }
        catch (error) {
            console.error('Error fetching data:', error);
            return error;
        }
    }

    const fetchForecastTemperature = () => {
        let d = new Date();
        let hour = d.getHours();
        let todayDate = new Date().toISOString().split('T')[0];
        return weather?.forecast?.forecastday?.flatMap(day =>
            day.hour
                .filter(hour =>
                    day.date !== todayDate || 
                    new Date().getHours() <= parseInt(hour.time.split(" ")[1].split(":")[0])
                )
                .map(hour => ({
                    temp_c: hour.temp_c,
                    time: hour.time.split(" ")[1], // Extract HH:MM
                    date: day.date
                }))
            ) || [];
        
        




    }


    const showConsole = () => {
        console.log(weather)
        console.log(typeof weather)
        const d = new Date();
        let hour = d.getHours();
        console.log(new Date().getHours())

        console.log(fetchForecastTemperature())
    }
    return (
        <div>
            <h1>Actual Weather</h1>

            {weather && weather.location ? (
                <div key={weather.location.name}>
                    <p>City: {weather.location.name}, {weather.location.country}</p>
                    <img src={`https:${weather.current.condition.icon}`} alt="Weather icon" />
                    <p>Temperature: {weather.current.temp_c}°C</p>
                    <p>Weather condition: {weather.current.condition.text}</p>
                    <p>Feels like: {weather.current.feelslike_c}°C</p>
                    <p>Humidity: {weather.current.humidity}%</p>
                    <p>Wind: {weather.current.wind_kph} km/h</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            {weather && weather.forecast ? (
                <div>
                    <h2>Forecast</h2>
                    {weather.forecast.forecastday.map(day => (
                        <div key={day.date}>
                            <p>Date: {day.date}</p>
                            <img src={`https:${day.day.condition.icon}`} alt="Weather icon" />
                            <p>Max temperature: {day.day.maxtemp_c}°C</p>
                            <p>Min temperature: {day.day.mintemp_c}°C</p>
                            <p>Average temperature: {day.day.avgtemp_c}°C</p>
                            <p>Max wind: {day.day.maxwind_kph} km/h</p>
                            <p>Total precipitation: {day.day.totalprecip_mm} mm</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {/* Only todays forecast temperature */}
            {/* {weather && weather.forecast ? (
                <div>
                    {weather.forecast.forecastday[0].hour.map(hour => (
                        (new Date().getHours() <= parseInt(hour.time.split(" ")[1].split(":")[0])) && <p>{hour.time.split(" ")[1]} - {hour.temp_c}</p>
                    ))}
                </div>
            )
                : (
                    <p>Loading...</p>
                )
            } */}



            {/* First sollution to display temperature from current hour - 3 days forecast */}
            {/* {weather && weather.forecast ? (
                <div>
                    {weather.forecast.forecastday.map(day => (
                        (day.date === new Date().toISOString().split('T')[0] ? (
                            day.hour.map(hour => ((
                                (new Date().getHours() <= parseInt(hour.time.split(" ")[1].split(":")[0])) && <p>{hour.time.split(" ")[1]} - {hour.temp_c}</p>
                            )))
                        ) :
                            (
                                day.hour.map(hour => (
                                    <p>{hour.time.split(" ")[1]} - {hour.temp_c}</p>
                                ))
                            ))

                    ))
                    }
                </div>
            )
                : (
                    <p>Loading...</p>
                )
            } */}

            {/* Second sollution to display temperature from current hour */}
            {/* FUNCTION */}
            {
            forecastTemperature?.map((hour, index) => (
                <p key={index}>{hour.time} - {hour.temp_c}</p>
            ) )
            }

            <button onClick={showConsole}>show console</button>
            <button onClick={fetchForecastTemperature}>fetch forecast temperature</button>
        </div>
    )
}

export default ActualWeather;