import { useState } from "react";

export default function WeatherApp() {
    const [query, setQuery] = useState("");

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-200 to-indigo-300 p-6">
            <h1 className="text-3xl font-bold mb-4 text-center text-white">Weather App</h1>
            <div className="max-w-md mx-auto">
                <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter city name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                />
            </div>
        </div>
    )
}