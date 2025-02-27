export const fetchWeather = async (city = "LODZ") => {
    const API_KEY = "77950a756080419794b91033252602"
    const BASE_URL = "http://api.weatherapi.com/v1"
    try {
        let request = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`, {
            method: 'GET', // Optional, as GET is the default method
        });
        let response = await request.json();
        return response;
    }
    catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}