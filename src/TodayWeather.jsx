import "./styles/TodayWeather.css";

function TodayWeather({ weather }) {
    return (
        <div className="weather-details" key={weather.location.name}>
            <h1>Actual Weather</h1>

            <p>City: {weather.location.name}, {weather.location.country}</p>
            <p>Chance of rain: {weather.forecast.forecastday[0].day.daily_chance_of_rain} %</p>

            <img src={`https:${weather.current.condition.icon}`} alt="Weather icon" />
            <p>Temperature: {weather.current.temp_c}°C</p>

        </div>

    )
}

export default TodayWeather;