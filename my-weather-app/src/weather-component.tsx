import React, { useEffect, useState } from 'react';
import './weather-component.css';
import { getWeatherData } from './response';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch weather data from your API
    const fetchWeatherData = async () => {
      try {
        const data = await getWeatherData();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <div>Loading weather data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="weather-container">
      <h1>Weather Information</h1>
      {weatherData && (
        <div>
          {weatherData.hourly.time.map((time, index) => (
            <p key={index}>
              {time.toISOString()}: {weatherData.hourly.temperature2m[index]}°C
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;