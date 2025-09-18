import React from 'react'
import { weekdayFromUnix, kToC, kToF } from '../utils/format'

export default function ForecastCard({ day, tzOffset, unit = 'C' }) {
  const { dt, temp, weather } = day
  const label = weekdayFromUnix(dt, tzOffset)
  const icon = weather?.[0]?.icon || '01d'
  const desc = weather?.[0]?.description || ''
  const tempVal = unit === 'C' ? kToC(temp.day) : kToF(temp.day)

  return (
    <div className="flex flex-col items-center p-4 glass rounded-xl shadow-md w-28">
      <div className="text-sm font-semibold">{label}</div>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={desc} className="w-14 h-14" />
      <div className="font-bold text-lg">{tempVal}°{unit}</div>
      <div className="small-muted text-center text-xs mt-1 capitalize">{desc}</div>
    </div>
  )
}