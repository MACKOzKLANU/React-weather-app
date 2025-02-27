function WeatherForecast({ forecast }) {
    return (
        <div>
            <h2>Forecast</h2>
            {forecast.forecastday.map(day => (
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

    )
}

export default WeatherForecast;