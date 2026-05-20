"use client";

import { useState } from "react";
import CarCard from "@/components/Card"; 
import { RiSearchLine, RiGridLine, RiFilter3Line } from "react-icons/ri";

export default function ExploreCars() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const carsData = [
    {
      id: "1",
      name: "BMW 5 Series",
      brand: "BMW",
      category: "Luxury",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=400",
      fuelType: "Octane",
      transmission: "Automatic",
      seats: 5,
      pricePerDay: 15000,
      isAvailable: true,
      location: "Dhaka"
    },
    {
      id: "2",
      name: "Toyota Premio 2020",
      brand: "Toyota",
      category: "Sedan",
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=400",
      fuelType: "Octane",
      transmission: "Automatic",
      seats: 5,
      pricePerDay: 4500,
      isAvailable: true,
      location: "Dhaka"
    },
    {
      id: "3",
      name: "Toyota Noah (Microbus)",
      brand: "Toyota",
      category: "Microbus",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400",
      fuelType: "CNG/Octane",
      transmission: "Automatic",
      seats: 8,
      pricePerDay: 6000,
      isAvailable: false,
      location: "Chittagong"
    },
    {
      id: "4",
      name: "Mitsubishi Outlander",
      brand: "Mitsubishi",
      category: "SUV",
      image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=400",
      fuelType: "Octane",
      transmission: "Automatic",
      seats: 7,
      pricePerDay: 9000,
      isAvailable: true,
      location: "Sylhet"
    }
  ];

  const categories = ["All", "Luxury", "Sedan", "SUV", "Microbus"];

  const filteredCars = carsData.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          car.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || car.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pt-24 pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight">
              Explore Our <span className="text-[#f97316]">Fleets</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-white/40 mt-1">
              Find the perfect ride for your next journey in Bangladesh.
            </p>
          </div>

          <div className="relative w-full md:max-w-md">
            <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search by car name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/[0.08] rounded-2xl pl-12 pr-4 py-3.5 text-sm text-gray-900 dark:text-white focus:border-[#f97316] dark:focus:border-[#f97316] outline-none transition-colors shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-gray-200 dark:border-white/[0.06] mb-8">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">
            <RiFilter3Line className="text-base" />
            Filter By:
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-[#f97316] text-white shadow-md shadow-[#f97316]/10"
                  : "bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-white/[0.04]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-[#121212] rounded-2xl border border-gray-100 dark:border-white/[0.06] p-8">
            <div className="w-12 h-12 bg-gray-100 dark:bg-white/[0.04] text-gray-400 flex items-center justify-center rounded-xl mx-auto mb-4">
              <RiGridLine className="text-2xl" />
            </div>
            <h3 className="text-base font-bold text-gray-950 dark:text-white">No Vehicles Found</h3>
            <p className="text-xs text-gray-500 dark:text-white/40 mt-1 max-w-xs mx-auto">
              We couldn't find any cars matching your search or filter criteria. Try adjusting them!
            </p>
          </div>
        )}

      </div>
    </div>
  );
}