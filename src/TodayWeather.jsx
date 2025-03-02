import "./styles/TodayWeather.css";

function TodayWeather({ weather }) {
    return (
        <div className="weather-main" key={weather.location.name}>
            <div className="weather-info">
                <h2>{weather.location.name}</h2>
                <p>Chance of rain: {weather.forecast.forecastday[0].day.daily_chance_of_rain} %</p>
                <p className="temp">Temperature: {weather.current.temp_c}°C</p>
            </div>
            <div className="weather-icon">
                <img src={`https:${weather.current.condition.icon}`} alt="Weather icon" />
            </div>
        </div>

    )
}

export default TodayWeather;