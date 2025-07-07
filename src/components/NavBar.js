import { useState } from "react";
import { FiSettings } from "react-icons/fi";

export default function NavBar({ onOpenSettings }) {
  return (
    <nav className="flex justify-between items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-4 shadow-md mb-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-sky-800 dark:text-white">Weather App</h1>
      <button
        onClick={onOpenSettings}
        className="text-sky-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 text-xl"
        aria-label="Open Settings"
      >
        <FiSettings />
      </button>
    </nav>
  );
}