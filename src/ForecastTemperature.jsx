function ForecastTemperature({ forecastTemperature }) {
    return (
        <div>{
            forecastTemperature.map((hour, index) => (
                <>
                <p key={index}>{hour.time} - {hour.temp_c}</p>
                <img src={`https:${hour.image_src}`} alt={hour.alt} />
                </>
            ))
        }
        </div>
    )
}

export default ForecastTemperature