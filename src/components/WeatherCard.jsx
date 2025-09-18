import React, { useState } from 'react'
import ForecastCard from './ForecastCard'
import { kToC, kToF } from '../utils/format'

function getWeatherEmoji(id) {
  if (id >= 200 && id < 300) return '⛈'
  if (id >= 300 && id < 600) return '🌧'
  if (id >= 600 && id < 700) return '❄'
  if (id >= 700 && id < 800) return '🌫'
  if (id === 800) return '🌞'
  if (id > 800 && id < 810) return '⛅'
  return '❓'
}

export default function WeatherCard({ data, forecast }) {
  const [unit, setUnit] = useState('C')
  if (!data) return null

  const {
    name,
    sys: { country } = {},
    main: { temp, humidity, feels_like, pressure } = {},
    weather: [{ description, id, icon } = {}] = [],
    wind: { speed } = {},
    timezone,
  } = data

  const tempVal = unit === 'C' ? kToC(temp) : kToF(temp)
  const feels = unit === 'C' ? kToC(feels_like) : kToF(feels_like)

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full glass p-6 rounded-2xl shadow-xl flex flex-col items-center">
        <div className="flex w-full items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold">{name}, <span className="text-xl font-medium">{country}</span></h1>
            <div className="small-muted">{description?.toUpperCase()}</div>
          </div>

          <div className="text-right">
            <div className="text-6xl">{getWeatherEmoji(id)}</div>
            <div className="small-muted">Wind {speed} m/s</div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <div className="text-6xl font-bold mr-6">{tempVal}°{unit}</div>
          <div className="flex flex-col">
            <button
              onClick={() => setUnit('C')}
              className={`px-3 py-1 rounded ${unit === 'C' ? 'bg-green-600 text-white' : 'bg-white'}`}
            >
              C
            </button>
            <button
              onClick={() => setUnit('F')}
              className={`px-3 py-1 rounded mt-2 ${unit === 'F' ? 'bg-green-600 text-white' : 'bg-white'}`}
            >
              F
            </button>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-4 mt-6 small-muted">
          <div className="text-center">
            <div className="font-semibold">Feels like</div>
            <div>{feels}°{unit}</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">Humidity</div>
            <div>{humidity}%</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">Pressure</div>
            <div>{pressure} hPa</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">Timezone</div>
            <div>UTC {timezone >= 0 ? '+' : ''}{timezone/3600}</div>
          </div>
        </div>
      </div>

      {forecast?.daily && (
        <div className="w-full mt-6">
          <h2 className="text-lg font-semibold mb-3">7-Day Forecast</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {forecast.daily.slice(1, 8).map((d) => (
              <ForecastCard key={d.dt} day={d} tzOffset={forecast.timezone_offset} unit={unit} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}