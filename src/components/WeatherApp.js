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
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError(null);
      setAlertMessage(null); // clear any previous alert

      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHERAPI_KEY}&q=${city}&days=3`
      );
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      setWeather(data);

      const upcomingHours = data.forecast.forecastday[0].hour.slice(0, 12);

      const alertHour = upcomingHours.find((hour) =>
        hour.condition.text.toLowerCase().includes("rain") ||
        hour.condition.text.toLowerCase().includes("snow")
      );

      if (alertHour) {
        const isSnow = alertHour.condition.text.toLowerCase().includes("snow");
        const type = isSnow ? "Snow" : "Rain";
        setAlertMessage(`🌨️ Heads up! ${type} is expected within the next 12 hours.`);
      }
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
        setSuggestionLoading(true);
        const res = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_WEATHERAPI_KEY}&q=${value}`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Autocomplete failed:", err);
      } finally {
        setSuggestionLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const formatDate = (dateStr) => {
    const options = { weekday: "long", month: "short", day: "numeric" };
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div
      className={`min-h-screen px-4 py-6 sm:p-6 transition-colors duration-500 ${
        isDarkMode
          ? "dark bg-gradient-to-br from-gray-900 to-gray-700"
          : "bg-gradient-to-br from-sky-200 to-indigo-300"
      }`}
    >
      <NavBar
        isDarkMode={isDarkMode}
        onOpenSettings={() => setShowSettings(true)}
      />
      
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
        {alertMessage && (
          <div className="max-w-md mx-auto mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 rounded shadow-md animate-fade-in">
            {alertMessage}
          </div>
        )}

      <div className="max-w-full sm:max-w-md mx-auto">
        <div className="relative">
          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
            <input
              type="text"
              className="flex-1 px-4 py-3 text-base rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter city name..."
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            {suggestionLoading && <Spinner />}
            <button
              onClick={() => fetchWeather(query)}
              className="px-4 py-3 text-base bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            >
              Enter
            </button>
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow mt-1 max-h-60 overflow-y-auto text-black text-sm sm:text-base">
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

      {loading && (
        <>
          <SkeletonCard />
          <div className="max-w-md mx-auto mt-6 grid grid-cols-1 gap-4">
            {[...Array(3)].map((_, i) => (
              <SkeletonForecastCard key={i} />
            ))}
          </div>
        </>
      )}

      {error && <p className="text-center mt-4 text-red-600">{error}</p>}

      {weather && (
        <div
          className={`max-w-full sm:max-w-md mx-auto mt-6 rounded-lg shadow-lg p-4 transition-colors duration-500 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-lg sm:text-xl font-semibold">Current Weather</h2>
          <p>
            Location: {weather.location.name}, {weather.location.country}
          </p>
          <p>
            Temperature: {isFahrenheit ? weather.current.temp_f : weather.current.temp_c}°
            {isFahrenheit ? "F" : "C"}
          </p>
          <p>Condition: {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="weather icon" />
        </div>
      )}

      {weather && (
        <div className="w-full max-w-6xl mx-auto mt-6 px-2 sm:px-4">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">3-Day Forecast</h2>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scroll-smooth">
            {weather.forecast.forecastday.map((day) => {
              const isExpanded = selectedDay === day.date;
              return (
                <div
                  key={day.date}
                  className={`min-w-[260px] sm:min-w-[320px] flex-shrink-0 bg-white bg-opacity-90 dark:bg-gray-800 dark:text-white rounded-lg p-4 shadow cursor-pointer transition duration-200 hover:ring-2 hover:ring-blue-400 snap-start ${
                    isExpanded ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedDay(isExpanded ? null : day.date)}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{formatDate(day.date)}</p>
                    <span
                      className={`transform transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
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

                  {!isExpanded && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Click to view hourly forecast
                    </p>
                  )}

                  <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? "max-h-[1000px] mt-2" : "max-h-0"}`}>
                    <div className="space-y-1 max-h-72 overflow-y-auto pr-1 sm:pr-2">
                      {day.hour.map((hour) => (
                        <div
                          key={hour.time_epoch}
                          className="flex justify-between text-xs sm:text-sm border-b pb-1"
                        >
                          <p>
                            {is24Hour
                              ? hour.time.split(" ")[1]
                              : new Date(hour.time).toLocaleTimeString(undefined, {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                          </p>
                          <div className="flex items-center gap-2">
                            <img
                              src={hour.condition.icon}
                              alt={hour.condition.text}
                              className="w-5 h-5"
                            />
                            <span>
                              {isFahrenheit ? hour.temp_f : hour.temp_c}°
                              {isFahrenheit ? "F" : "C"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function Spinner() {
  return <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>;
}

function SkeletonLine({ width = "w-full", height = "h-4", className = "" }) {
  return <div className={`bg-gray-300 dark:bg-gray-700 rounded ${width} ${height} animate-pulse ${className}`}></div>;
}

export function SkeletonCard() {
  return (
    <div className="max-w-full sm:max-w-md mx-auto mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <SkeletonLine width="w-3/4" height="h-6" className="mb-4" />
      <SkeletonLine width="w-1/2" className="mb-2" />
      <SkeletonLine width="w-1/3" className="mb-2" />
      <SkeletonLine width="w-2/3" className="mb-4" />
      <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse mx-auto" />
    </div>
  );
}

export function SkeletonForecastCard() {
  return (
    <div className="bg-white bg-opacity-90 dark:bg-gray-800 dark:text-white rounded-lg p-4 shadow">
      <SkeletonLine width="w-2/3" height="h-5" className="mb-2" />
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
        <SkeletonLine width="w-3/4" height="h-4" />
      </div>
      <SkeletonLine width="w-1/2" />
    </div>
  );
}