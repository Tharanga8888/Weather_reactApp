import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import Loader from './components/Loader'
import useWeather from './hooks/useWeather'

export default function App() {
  const [city, setCity] = useState('')
  const [weatherResult, setWeatherResult] = useState(null)
  const { fetchByCity, loading, error } = useWeather()

  const handleSearch = async () => {
    if (!city || city.trim().length === 0) {
      setWeatherResult({ error: 'Please enter a city' })
      return
    }

    try {
      const { current, forecast } = await fetchByCity(city.trim())
      setWeatherResult({ current, forecast })
    } catch (err) {
      setWeatherResult({ error: err.message })
    }
  }

  return (
    <div className="min-h-screen bg-animated flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-extrabold text-white">Awesome Weather</h1>
          <div className="text-white small-muted">Beautiful weather data, fast.</div>
        </div>

        <div className="glass p-6 rounded-3xl shadow-xl">
          <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />

          <div className="mt-6">
            {loading && <Loader />}

            {weatherResult?.error && (
              <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700 font-semibold">{weatherResult.error}</div>
            )}

            {weatherResult?.current && (
              <div className="mt-4">
                <WeatherCard data={weatherResult.current} forecast={weatherResult.forecast} />
              </div>
            )}
          </div>

          <div className="mt-6 small-muted">Tip: try cities like "New York", "London" or "Colombo"</div>
        </div>

        <footer className="mt-6 text-center small-muted">Made with ❤️ • Data from OpenWeather</footer>
      </div>
    </div>
  )
}