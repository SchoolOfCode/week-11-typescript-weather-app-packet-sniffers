import { useState, useEffect } from 'react';
import './App.css';
import { getWeatherData } from './response.tsx';
import WeatherComponent from './weather-component.tsx';

function App() {
  const [count, setCount] = useState(0);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeatherData();
      setWeatherData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
      <h1>Weather App</h1>
      <WeatherComponent />
        </div>
    
    </>
  );
}

export default App;
