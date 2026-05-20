"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  RiGasStationLine, 
  RiSteeringLine, 
  RiUser3Line, 
  RiArrowRightUpLine 
} from "react-icons/ri";

export default function CarCard({ car }) {
  // Backend API object destructuring with fallback values
  const {
    _id,
    name,
    price,
    type,
    image,
    seats,
    availability,
    brand = "Toyota", 
    fuelType = "Octane",
    transmission = "Automatic"
  } = car;

  return (
    <div className="group bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/[0.06] rounded-2xl overflow-hidden hover:shadow-xl hover:border-gray-200 dark:hover:border-white/[0.12] transition-all duration-300 flex flex-col">
      
      {/* Car Image Container */}
      <div className="relative w-full h-48 bg-gray-50 dark:bg-white/[0.02] overflow-hidden">
        <Image
          src={image || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400"}
          alt={name}
          fill
          sizes="(max-w-7xl) 25vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={false}
        />
        {/* Availability Badge */}
        <span className={`absolute top-3 right-3 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full z-10 ${
          availability 
            ? "bg-green-500/10 text-green-500 border border-green-500/20" 
            : "bg-red-500/10 text-red-500 border border-red-500/20"
        }`}>
          {availability ? "Available" : "Rented"}
        </span>
      </div>

      {/* Car Details Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category/Type */}
          <span className="text-xs font-medium text-gray-400 dark:text-white/40 uppercase tracking-wider block mb-1">
            {brand} • {type}
          </span>
          
          {/* Car Name */}
          <h3 className="text-lg font-bold text-gray-950 dark:text-white group-hover:text-[#f97316] transition-colors line-clamp-1">
            {name}
          </h3>

          {/* Specifications Grid */}
          <div className="grid grid-cols-3 gap-2 my-4 pt-4 border-t border-gray-100 dark:border-white/[0.06]">
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50 dark:bg-white/[0.02]">
              <RiGasStationLine className="text-gray-500 dark:text-white/50 text-base mb-1" />
              <span className="text-[11px] font-medium text-gray-600 dark:text-white/70 truncate w-full text-center">
                {fuelType}
              </span>
            </div>
            
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50 dark:bg-white/[0.02]">
              <RiSteeringLine className="text-gray-500 dark:text-white/50 text-base mb-1" />
              <span className="text-[11px] font-medium text-gray-600 dark:text-white/70 truncate w-full text-center">
                {transmission}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50 dark:bg-white/[0.02]">
              <RiUser3Line className="text-gray-500 dark:text-white/50 text-base mb-1" />
              <span className="text-[11px] font-medium text-gray-600 dark:text-white/70">
                {seats} Seats
              </span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA Button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/[0.06] mt-auto">
          <div>
            <span className="text-xs text-gray-400 dark:text-white/40 block">Price / Day</span>
            <p className="text-base font-bold text-gray-950 dark:text-white">
              ৳{(price || 0).toLocaleString('en-BD')}
            </p>
          </div>

          <Link
            href={`/cars/${_id}`}
            className="flex items-center gap-1 bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors group/btn"
          >
            Details
            <RiArrowRightUpLine className="text-sm group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}