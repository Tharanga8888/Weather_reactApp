import { useState } from "react";
import WeatherCard from "./components/WeatherCard.jsx";


export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "dacfff0030b8fc26a879d5f858256b40";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city) {
      setError("Please enter a city");
      setWeatherData(null);
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      if (!res.ok) throw new Error("Could not fetch weather data");

      const data = await res.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <form onSubmit={handleSubmit} className="my-8">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="cityInput p-3 text-2xl font-bold border-2 border-gray-400 rounded-lg w-72 mr-4"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-500 text-white font-bold text-2xl px-5 py-3 rounded-md"
        >
          Get Weather
        </button>
      </form>

      {(weatherData || error) && (
        <div className="card bg-gradient-to-b from-blue-300 to-yellow-300 shadow-lg p-10 rounded-xl flex flex-col items-center w-80">
          {error ? (
            <p className="text-3xl font-bold text-gray-800">{error}</p>
          ) : (
            <WeatherCard data={weatherData} />
          )}
        </div>
      )}
    </div>
  );
}
