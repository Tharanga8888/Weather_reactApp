export function kToC(k) {
  return (k - 273.15).toFixed(1)
}
export function kToF(k) {
  return ((k - 273.15) * 9/5 + 32).toFixed(1)
}

export function weekdayFromUnix(ts, tzOffset = 0) {
  const d = new Date((ts + tzOffset) * 1000)
  return d.toLocaleDateString(undefined, { weekday: 'short' })
}