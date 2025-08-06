import React from "react";

/**
 * Settings Component
 *
 * A slide-out panel for user preferences in the Weather App.
 * Allows toggling between Celsius/Fahrenheit, 12h/24h time formats, and light/dark mode.
 * Also includes a close button to hide the settings panel.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isFahrenheit - Whether temperature is displayed in Fahrenheit (true) or Celsius (false)
 * @param {Function} props.setIsFahrenheit - Setter function to toggle isFahrenheit
 * @param {boolean} props.is24Hour - Whether time is shown in 24-hour format (true) or 12-hour (false)
 * @param {Function} props.setIs24Hour - Setter function to toggle is24Hour
 * @param {boolean} props.isDarkMode - Whether dark mode is enabled
 * @param {Function} props.setIsDarkMode - Setter function to toggle isDarkMode
 * @param {Function} props.onClose - Callback to close the settings panel
 *
 * @returns {JSX.Element} Rendered settings panel
 */
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
    // Full-height fixed settings panel on the right side of the screen
    <div className="fixed top-0 right-0 h-full z-50">
      <div className="w-72 h-full bg-white dark:bg-gray-900 shadow-lg p-6 transform transition-transform duration-300 translate-x-0">
        
        {/* Header with title and close button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Settings toggles */}
        <div className="flex flex-col items-center gap-6">
          
          {/* Temperature unit toggle */}
          <div className="flex items-center gap-2">
            {/* Celsius label - bold if active */}
            <span className={`text-gray-800 dark:text-white ${!isFahrenheit ? 'font-bold' : 'opacity-60'}`}>°C</span>
            
            {/* Toggle switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isFahrenheit}
                onChange={() => setIsFahrenheit(!isFahrenheit)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring peer-focus:ring-blue-300 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
            </label>

            {/* Fahrenheit label - bold if active */}
            <span className={`text-gray-800 dark:text-white ${isFahrenheit ? 'font-bold' : 'opacity-60'}`}>°F</span>
          </div>

          {/* Time format toggle */}
          <div className="flex items-center gap-2">
            {/* 12h label - bold if active */}
            <span className={`text-gray-800 dark:text-white ${!is24Hour ? 'font-bold' : 'opacity-60'}`}>12h</span>

            {/* Toggle switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={is24Hour}
                onChange={() => setIs24Hour(!is24Hour)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring peer-focus:ring-blue-300 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
            </label>

            {/* 24h label - bold if active */}
            <span className={`text-gray-800 dark:text-white ${is24Hour ? 'font-bold' : 'opacity-60'}`}>24h</span>
          </div>

          {/* Theme toggle: light (☀️) or dark (🌙) */}
          <div className="flex items-center gap-2">
            {/* Sun icon for light mode - bold if active */}
            <span className={`text-gray-800 dark:text-white ${!isDarkMode ? 'font-bold' : 'opacity-60'}`}>☀️</span>

            {/* Toggle switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={() => setIsDarkMode(!isDarkMode)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring peer-focus:ring-blue-300 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
            </label>

            {/* Moon icon for dark mode - bold if active */}
            <span className={`text-gray-800 dark:text-white ${isDarkMode ? 'font-bold' : 'opacity-60'}`}>🌙</span>
          </div>

        </div>
      </div>
    </div>
  );
}
