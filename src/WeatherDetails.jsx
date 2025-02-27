function WeatherDetails({ weather }) {
    return (
        <div key={weather.location.name}>
            <h1>Actual Weather</h1>

            <p>City: {weather.location.name}, {weather.location.country}</p>
            <img src={`https:${weather.current.condition.icon}`} alt="Weather icon" />
            <p>Temperature: {weather.current.temp_c}°C</p>
            <p>Weather condition: {weather.current.condition.text}</p>
            <p>Feels like: {weather.current.feelslike_c}°C</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Wind: {weather.current.wind_kph} km/h</p>
        </div>

    )
}

export default WeatherDetails;
