import React from "react";

export default function Settings({
  isFahrenheit,
  setIsFahrenheit,
  is24Hour,
  setIs24Hour,
  isDarkMode,
  setIsDarkMode,
  onClose,
}) {
  return (
    <div className="fixed top-0 right-0 w-72 h-full bg-white dark:bg-gray-900 shadow-lg p-6 z-50 transition-all">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Settings</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col items-center gap-6">

        <div className="flex items-center gap-2">
          <span className={`text-gray-800 dark:text-white ${!isFahrenheit ? 'font-bold' : 'opacity-60'}`}>°C</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isFahrenheit}
              onChange={() => setIsFahrenheit(!isFahrenheit)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring peer-focus:ring-blue-300 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
          <span className={`text-gray-800 dark:text-white ${isFahrenheit ? 'font-bold' : 'opacity-60'}`}>°F</span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-gray-800 dark:text-white ${!is24Hour ? 'font-bold' : 'opacity-60'}`}>12h</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={is24Hour}
              onChange={() => setIs24Hour(!is24Hour)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring peer-focus:ring-blue-300 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
          <span className={`text-gray-800 dark:text-white ${is24Hour ? 'font-bold' : 'opacity-60'}`}>24h</span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-gray-800 dark:text-white ${!isDarkMode ? 'font-bold' : 'opacity-60'}`}>☀️</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring peer-focus:ring-blue-300 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
          <span className={`text-gray-800 dark:text-white ${isDarkMode ? 'font-bold' : 'opacity-60'}`}>🌙</span>
        </div>

      </div>
    </div>
  );
}