import { Link } from "react-router-dom";
import "./styles/WeatherForecast.css";

function WeatherForecast({ forecast }) {
    console.log(forecast);
    const getDay = (date) => {
        const today = new Date().getDay();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = new Date(date).getDay();
        if (day === today && date === new Date().toISOString().split('T')[0]) {
            return "Today";
        }
        return days[day];
    }

    const getConsoleLog = (weather) => {
        console.log(weather)
    }

    return (
        <div className="daily-forecast">
            <h2>3-day Forecast</h2>
            {forecast.forecastday.map(day => (
                <>

                    <Link to={`/forecast/${day.date}`}
                        state={day}
                        key={day.date}
                    >
                        <div className="daily-item">
                            <p>Date: {getDay(day.date)}</p>

                            <img src={`https:${day.day.condition.icon}`} alt="Weather icon" />
                            <p>{day.day.condition.text}</p>
                            <p>{day.day.maxtemp_c}°C / {day.day.mintemp_c}°C</p>

                        </div>
                    </Link>
                </>
            ))
            }
        </div >

    )
}

export default WeatherForecast;