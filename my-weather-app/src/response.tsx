

const params = {
  latitude: 51.5085,
  longitude: -0.1257,
  hourly: "temperature_2m",
  models: "ukmo_seamless"
};
const url = "https://api.open-meteo.com/v1/forecast";

export const getWeatherData = async () => {
  const response = await fetch(`${url}?latitude=${params.latitude}&longitude=${params.longitude}&hourly=${params.hourly}&models=${params.models}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  const data = await response.json();

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  const utcOffsetSeconds = data.utc_offset_seconds;
  const hourly = data.hourly;

  const weatherData = {
    hourly: {
      time: range(Number(hourly.time[0]), Number(hourly.time[hourly.time.length - 1]), hourly.time_interval).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),
      temperature2m: hourly.temperature_2m,
    },
  };
  console.log(weatherData);
  return weatherData;
  
    
}
