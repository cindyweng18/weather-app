import { useState } from "react";

export default function WeatherApp() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHERAPI_KEY}&q=${city}&days=7`
      );
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeather(query);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-indigo-300 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-white">Weather App </h1>
      <div className="max-w-md mx-auto">
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter city name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {loading && <p className="text-center mt-4 text-white">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-600">{error}</p>}

      {weather && (
        <div className="max-w-md mx-auto mt-6 bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold">Current Weather</h2>
          <p>Location: {weather.location.name}, {weather.location.country}</p>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="weather icon" />
        </div>
      )}
      {weather && (
        <div className="max-w-md mx-auto mt-6">
          <h2 className="text-xl font-bold text-white mb-2">7-Day Forecast</h2>
          <div className="grid grid-cols-1 gap-4">
            {weather.forecast.forecastday.map((day) => (
              <div
                key={day.date}
                className="bg-white bg-opacity-90 rounded-lg p-4 shadow"
              >
                <p className="font-semibold">{day.date}</p>
                <div className="flex items-center gap-2">
                  <img
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                    className="w-8 h-8"
                  />
                  <p>{day.day.condition.text}</p>
                </div>
                <p>
                  {day.day.mintemp_c}°C — {day.day.maxtemp_c}°C
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}