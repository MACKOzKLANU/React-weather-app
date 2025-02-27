function ForecastTemperature({ forecastTemperature }) {
    return (
        <div>{
            forecastTemperature.map((hour, index) => (
                <p key={index}>{hour.time} - {hour.temp_c}</p>
            ))
        }
        </div>
    )
}

export default ForecastTemperature