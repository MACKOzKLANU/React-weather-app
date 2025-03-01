import { useRef, useState } from "react";

const ITEM_WIDTH = 200;

function ForecastTemperature({ forecastTemperature }) {
    const [scrollPosition, setScrollPosition] = useState(0);

    const containerRef = useRef();

    const handleScroll = (scrollAmount) => {

        const newScrollPosition = scrollPosition + scrollAmount;
        const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth + ITEM_WIDTH; 
        if (newScrollPosition < 0 || newScrollPosition > maxScroll) {
            return;
        }
        setScrollPosition(newScrollPosition);

        containerRef.current.scrollLeft = newScrollPosition;


    };

    return (
        <div className="forecast-container">
            {/* Left Arrow */}

            <svg className="arrow" onClick={() => handleScroll(-ITEM_WIDTH)} fill="#ffffff" height="50px" width="50px" viewBox="0 0 330.002 330.002">
                <path d="M233.25,306.001L127.5,165.005L233.25,24.001c4.971-6.628,3.627-16.03-3-21c-6.627-4.971-16.03-3.626-21,3 
            L96.75,156.005c-4,5.333-4,12.667,0,18l112.5,149.996c2.947,3.93,7.451,6.001,12.012,6.001c3.131,0,6.29-0.978,8.988-3.001 
            C236.878,322.03,238.221,312.628,233.25,306.001z">
                </path>
            </svg>
            {/* Scrollable Content */}

            <div className="forecast-temperature"
                ref={containerRef}
                style={{
                    overflowX: "scroll",
                    scrollBehavior: "smooth"
                }}

            >
                <div className="content-box">
                    {
                        forecastTemperature.map((hour, index) => (
                            <div className="single-hour" key={index}>
                                <p key={index}>{hour.time} </p>
                                <img src={`https:${hour.image_src}`} alt={hour.alt} />
                                <p>{hour.temp_c} °C</p>

                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Right Arrow */}

            <svg className="arrow" onClick={() => handleScroll(ITEM_WIDTH)} fill="#ffffff" height="50px" width="50px" viewBox="0 0 330 330">
                <path d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 
            c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 
            C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 
            C255,161.018,253.42,157.202,250.606,154.389z">
                </path>
            </svg>

        </div>

    )
}

export default ForecastTemperature