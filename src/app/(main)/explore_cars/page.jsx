"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RiSearchLine, RiCarLine, RiFilter3Line } from "react-icons/ri";
import Card from "@/app/component/Card";


export default function ExploreCarsPage() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

  useEffect(() => {
    fetchAllCars();
  }, []);

  const fetchAllCars = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/cars`);
      if (!res.ok) throw new Error("Failed to fetch cars");
      const data = await res.json();
      setCars(data);
      setFilteredCars(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setFilteredCars(cars);
      return;
    }
    setSearching(true);
    try {
      const res = await fetch(`${API_URL}/cars/search/${encodeURIComponent(searchTerm)}`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setFilteredCars(data);
    } catch (err) {
      console.error(err);
      setFilteredCars([]);
    } finally {
      setSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilteredCars(cars);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#f97316] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-white/50 text-sm">Loading premium fleet...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-6 py-3 rounded-xl text-sm">
          {error}
        </div>
        <button
          onClick={fetchAllCars}
          className="px-5 py-2 bg-[#f97316] text-white rounded-xl hover:bg-[#ea580c] transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Explore Our Fleet
          </h1>
          <p className="text-gray-500 dark:text-white/50 mt-2">
            Find the perfect ride for your journey
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search by car name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white placeholder-gray-400 focus:border-[#f97316] outline-none transition"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSearch}
              disabled={searching}
              className="px-6 py-3 bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold rounded-xl transition shadow-md disabled:opacity-50"
            >
              {searching ? "Searching..." : "Search"}
            </button>
            {searchTerm && (
              <button
                onClick={resetSearch}
                className="px-6 py-3 bg-gray-200 dark:bg-white/[0.08] text-gray-700 dark:text-white/70 rounded-xl hover:bg-gray-300 dark:hover:bg-white/[0.12] transition"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {filteredCars.length === 0 ? (
          <div className="bg-white dark:bg-[#121212] rounded-2xl border border-gray-100 dark:border-white/[0.06] p-12 text-center shadow-md">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#f97316]/10 flex items-center justify-center">
              <RiCarLine className="text-3xl text-[#f97316]" />
            </div>
            <p className="text-gray-500 dark:text-white/50">No cars match your search.</p>
            <button
              onClick={resetSearch}
              className="mt-4 text-[#f97316] hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500 dark:text-white/40">
                Showing {filteredCars.length} {filteredCars.length === 1 ? "car" : "cars"}
              </p>
              <button className="flex items-center gap-2 text-sm text-gray-500 dark:text-white/50 hover:text-[#f97316] transition">
                <RiFilter3Line /> Filter
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCars.map((car) => (
                <Card key={car._id} car={car} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}