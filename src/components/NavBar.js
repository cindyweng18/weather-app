import { FiSettings } from "react-icons/fi";

/**
 * NavBar Component
 *
 * This component renders a navigation bar for the Weather App.
 * It includes the app title and a settings button with a gear icon.
 * The visual style dynamically changes based on the `isDarkMode` prop.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onOpenSettings - Callback function triggered when the settings button is clicked
 * @param {boolean} props.isDarkMode - Determines whether dark mode styles should be applied
 *
 * @returns {JSX.Element} The rendered navigation bar
 */
export default function NavBar({ onOpenSettings, isDarkMode }) {
  return (
    <nav
      className={`flex justify-between items-center rounded-xl p-4 shadow-md mb-6 max-w-4xl mx-auto transition-colors duration-500 ${
        isDarkMode ? "bg-gray-800/80 text-white" : "bg-white/80 text-sky-800"
      }`}
    >
      {/* App title */}
      <h1 className="text-2xl font-bold transition-colors duration-500">
        Weather App
      </h1>

      {/* Settings button with gear icon */}
      <button
        onClick={onOpenSettings}
        className="hover:text-blue-600 dark:hover:text-blue-400 text-xl transition-colors duration-500"
        aria-label="Open Settings"
      >
        <FiSettings />
      </button>
    </nav>
  );
}
