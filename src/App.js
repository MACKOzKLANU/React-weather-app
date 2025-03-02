import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ActualWeather from './ActualWeather';
import './App.css';
import WeatherDetails from './WeatherDetails';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<ActualWeather></ActualWeather>}></Route>
          <Route path='/forecast/:date' element={<WeatherDetails ></WeatherDetails>}></Route>
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
