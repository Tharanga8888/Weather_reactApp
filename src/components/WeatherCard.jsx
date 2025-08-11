export default function WeatherCard({ data }) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  const getWeatherEmoji = (id) => {
    if (id >= 200 && id < 300) return "⛈";
    if (id >= 300 && id < 600) return "🌧";
    if (id >= 600 && id < 700) return "❄";
    if (id >= 700 && id < 800) return "🌫";
    if (id === 800) return "🌞";
    if (id > 800 && id < 810) return "⛅";
    return "❓";
  };

  const tempF = ((temp - 273.15) * (9 / 5) + 32).toFixed(1);

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{city}</h1>
      <p className="text-4xl font-bold text-gray-800 mb-4">{tempF}℉</p>
      <p className="font-bold mb-4">Humidity: {humidity}%</p>
      <p className="italic font-bold text-2xl mb-4">{description}</p>
      <p className="text-7xl">{getWeatherEmoji(id)}</p>
    </>
  );
}
