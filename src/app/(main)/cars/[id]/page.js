"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  RiGasStationLine, 
  RiSteeringLine, 
  RiUser3Line, 
  RiCalendarLine, 
  RiShieldCheckLine,
  RiArrowLeftLine,
  RiCheckboxCircleLine
} from "react-icons/ri";

export default function CarDetails() {
  const [days, setDays] = useState(1);
  const pricePerDay = 4500;

  const car = {
    name: "Toyota Premio F EX Package 2020",
    brand: "Toyota",
    category: "Sedan",
    fuelType: "Octane",
    transmission: "Automatic",
    seats: 5,
    engine: "1500 cc",
    color: "Pearl White",
    pricePerDay: pricePerDay,
    isAvailable: true,
    description: "Toyota Premio is one of the most popular and comfortable premium sedans in Bangladesh. Perfect for family trips, corporate movements, and long drives. It offers a smooth ride with exceptional fuel efficiency and premium interior comfort.",
    features: [
      "Air Conditioner & Heater",
      "Anti-Lock Braking System (ABS)",
      "Multimedia Touch Screen & Bluetooth",
      "Back Camera & Parking Sensors",
      "Dual Airbags",
      "Push Start Button"
    ],
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400"
    ]
  };

  const [activeImage, setActiveImage] = useState(car.images[0]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pt-24 pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <Link 
          href="/cars" 
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-white/60 hover:text-[#f97316] dark:hover:text-[#f97316] transition-colors mb-8 group"
        >
          <RiArrowLeftLine className="text-lg group-hover:-translate-x-0.5 transition-transform" />
          Back to Explore
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            <div className="flex flex-col gap-4">
              <div className="w-full h-[300px] md:h-[450px] bg-white dark:bg-[#121212] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/[0.06]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={activeImage} 
                  alt={car.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex gap-4">
                {car.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === img ? "border-[#f97316]" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-6 md:p-8 flex flex-col gap-6">
              <div>
                <span className="text-xs font-semibold text-[#f97316] uppercase tracking-wider bg-[#f97316]/10 px-3 py-1 rounded-full">
                  {car.brand}
                </span>
                <h1 className="text-2xl md:text-4xl font-extrabold text-gray-950 dark:text-white mt-3">
                  {car.name}
                </h1>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-100 dark:border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/[0.02] flex items-center justify-center text-gray-500 dark:text-white/60">
                    <RiGasStationLine className="text-xl" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Fuel Type</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{car.fuelType}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/[0.02] flex items-center justify-center text-gray-500 dark:text-white/60">
                    <RiSteeringLine className="text-xl" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Transmission</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{car.transmission}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/[0.02] flex items-center justify-center text-gray-500 dark:text-white/60">
                    <RiUser3Line className="text-xl" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Seats</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{car.seats} Seats</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/[0.02] flex items-center justify-center text-gray-500 dark:text-white/60">
                    <RiCalendarLine className="text-xl" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Engine</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{car.engine}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-950 dark:text-white mb-3">Description</h3>
                <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed">
                  {car.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-950 dark:text-white mb-4">Features & Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-white/80">
                      <RiCheckboxCircleLine className="text-[#f97316] text-lg flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-1 sticky top-24 flex flex-col gap-4">
            <div className="bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-6 shadow-xl shadow-gray-100 dark:shadow-none">
              <h3 className="text-lg font-bold text-gray-950 dark:text-white mb-4">Booking Summary</h3>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-white/[0.06]">
                <span className="text-sm text-gray-500 dark:text-white/60">Price / Day</span>
                <span className="text-base font-bold text-gray-950 dark:text-white">৳{car.pricePerDay.toLocaleString('en-BD')}</span>
              </div>

              <div className="py-4 border-b border-gray-100 dark:border-white/[0.06]">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                  Select Total Days
                </label>
                <div className="flex items-center border border-gray-200 dark:border-white/[0.08] rounded-xl overflow-hidden w-full max-w-[140px] bg-gray-50 dark:bg-white/[0.02]">
                  <button 
                    onClick={() => setDays(Math.max(1, days - 1))}
                    className="w-10 h-10 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-colors font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-semibold text-sm text-gray-900 dark:text-white">
                    {days}
                  </span>
                  <button 
                    onClick={() => setDays(days + 1)}
                    className="w-10 h-10 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-colors font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center py-4 mb-6">
                <div>
                  <span className="text-sm font-bold text-gray-950 dark:text-white block">Total Payable</span>
                  <span className="text-xs text-gray-400">VAT & Taxes included</span>
                </div>
                <span className="text-2xl font-extrabold text-[#f97316]">
                  ৳{(car.pricePerDay * days).toLocaleString('en-BD')}
                </span>
              </div>

              <button className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-[#f97316]/10 mb-4">
                Book This Car
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-white/40">
                <RiShieldCheckLine className="text-base text-green-500" />
                Secure Checkout & Instant Confirmation
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}