import { FiSettings } from "react-icons/fi";

export default function NavBar({ onOpenSettings, isDarkMode }) {
  return (
    <nav
      className={`flex justify-between items-center rounded-xl p-4 shadow-md mb-6 max-w-4xl mx-auto ${
        isDarkMode ? "bg-gray-800/80 text-white" : "bg-white/80 text-sky-800"
      }`}
    >
      <h1 className="text-2xl font-bold">Weather App</h1>
      <button
        onClick={onOpenSettings}
        className="hover:text-blue-600 dark:hover:text-blue-400 text-xl"
        aria-label="Open Settings"
      >
        <FiSettings />
      </button>
    </nav>
  );
}