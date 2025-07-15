import { useState } from "react";
import NavBar from "./NavBar";
import Settings from "./Settings";

export default function WeatherApp() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [is24Hour, setIs24Hour] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

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

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_WEATHERAPI_KEY}&q=${value}`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Autocomplete failed:", err);
      }
    } else {
      setSuggestions([]);
    }
  };


  const formatDate = (dateStr) => {
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className={isDarkMode ? "dark min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-6" : "min-h-screen bg-gradient-to-br from-sky-200 to-indigo-300 p-6"}>
      <NavBar onOpenSettings={() => setShowSettings(true)} />
      {showSettings && (
        <Settings
          isFahrenheit={isFahrenheit}
          setIsFahrenheit={setIsFahrenheit}
          is24Hour={is24Hour}
          setIs24Hour={setIs24Hour}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onClose={() => setShowSettings(false)}
        />
      )}

      <div className="max-w-md mx-auto">
        <div className="relative">
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter city name..."
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={() => fetchWeather(query)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            >
              Enter
            </button>
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow mt-1 max-h-60 overflow-y-auto text-black">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    setQuery(item.name);
                    setSuggestions([]);
                    fetchWeather(item.name);
                  }}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {item.name}, {item.country}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {loading && <p className="text-center mt-4 text-white">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-600">{error}</p>}

      {weather && (
        <div className="max-w-md mx-auto mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-gray-900 dark:text-white">
          <h2 className="text-xl font-semibold">Current Weather</h2>
          <p>Location: {weather.location.name}, {weather.location.country}</p>
          <p>Temperature: {isFahrenheit ? weather.current.temp_f : weather.current.temp_c}°{isFahrenheit ? "F" : "C"}</p>
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
                className="bg-white bg-opacity-90 dark:bg-gray-800 dark:text-white rounded-lg p-4 shadow cursor-pointer"
                onClick={() =>
                  setSelectedDay(selectedDay === day.date ? null : day.date)
                }
              >
                <p className="font-semibold">{formatDate(day.date)}</p>
                <div className="flex items-center gap-2">
                  <img
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                    className="w-8 h-8"
                  />
                  <p>{day.day.condition.text}</p>
                </div>
                <p>
                  {isFahrenheit ? day.day.mintemp_f : day.day.mintemp_c}°{isFahrenheit ? "F" : "C"} — {isFahrenheit ? day.day.maxtemp_f : day.day.maxtemp_c}°{isFahrenheit ? "F" : "C"}
                </p>

                {selectedDay === day.date && (
                  <div className="mt-2 space-y-1 max-h-72 overflow-y-auto">
                    {day.hour.map((hour) => (
                      <div
                        key={hour.time_epoch}
                        className="flex justify-between text-sm border-b pb-1"
                      >
                        <p>
                          {is24Hour
                            ? hour.time.split(" ")[1]
                            : new Date(hour.time).toLocaleTimeString(undefined, {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true,
                              })}
                        </p>
                        <div className="flex items-center gap-2">
                          <img
                            src={hour.condition.icon}
                            alt={hour.condition.text}
                            className="w-5 h-5"
                          />
                          <span>{isFahrenheit ? hour.temp_f : hour.temp_c}°{isFahrenheit ? "F" : "C"}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
