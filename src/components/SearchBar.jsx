import React from 'react'

export default function SearchBar({ city, setCity, onSearch }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSearch()
      }}
      className="flex items-center"
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city, e.g. Tokyo"
        className="city-input p-3 text-lg font-semibold border-2 border-gray-300 rounded-lg w-72 mr-4"
        aria-label="City"
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-500 text-white font-bold text-lg px-4 py-2 rounded-md"
      >
        Get Weather
      </button>
    </form>
  )
}