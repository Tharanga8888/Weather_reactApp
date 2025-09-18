import { useState, useCallback } from 'react'

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

export default function useWeather() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchByCity = useCallback(async (city) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`
      )
      if (!res.ok) {
        const text = await res.text()
        throw new Error(`City not found or API error. (${res.status}) ${text}`)
      }
      const data = await res.json()

      // fetch onecall using coords for forecast
      const { coord: { lat, lon } = {} } = data
      let forecast = null
      if (lat != null && lon != null) {
        const fRes = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${apiKey}`
        )
        if (fRes.ok) forecast = await fRes.json()
      }

      setLoading(false)
      return { current: data, forecast }
    } catch (err) {
      setLoading(false)
      setError(err.message)
      throw err
    }
  }, [])

  return { fetchByCity, loading, error }
}