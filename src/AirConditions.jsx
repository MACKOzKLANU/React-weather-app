import "./styles/AirConditions.css";

function AirConditions({ weather }) {
    return (
        <div className="weather-details" key={weather.location.name}>
            <h1>Air Conditions</h1>

            
            <p>Feels like: {weather.current.feelslike_c}°C</p>
            <p>Wind: {weather.current.wind_kph} km/h</p>
            <p>Chance of rain: {weather.forecast.forecastday[0].day.daily_chance_of_rain} %</p>
            <p>UV index: {weather.current.uv} </p>



        </div>

    )
}

export default AirConditions;