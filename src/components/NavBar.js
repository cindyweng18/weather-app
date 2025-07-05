import React from "react";

export default function NavBar({ isFahrenheit, setIsFahrenheit, is24Hour, setIs24Hour, isDarkMode, setIsDarkMode }) {
  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-4 shadow-md mb-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-sky-800 dark:text-white mb-3 sm:mb-0">Weather App</h1>

        <div className="flex flex-wrap gap-6 justify-center sm:justify-end text-sm">
        <div className="flex items-center gap-2">
            <span className="text-gray-800 dark:text-white">°C</span>
            <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={isFahrenheit}
                onChange={() => setIsFahrenheit(!isFahrenheit)}
                className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className="text-gray-800 dark:text-white">°F</span>
        </div>

        <div className="flex items-center gap-2">
            <span className="text-gray-800 dark:text-white">12h</span>
            <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={is24Hour}
                onChange={() => setIs24Hour(!is24Hour)}
                className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className="text-gray-800 dark:text-white">24h</span>
        </div>

        <div className="flex items-center gap-2">
            <span className="text-gray-800 dark:text-white">☀️</span>
            <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={isDarkMode}
                onChange={() => setIsDarkMode(!isDarkMode)}
                className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className="text-gray-800 dark:text-white">🌙</span>
        </div>
        </div>
    </nav>
  );
}