"use client";

import Link from "next/link";
import Marquee from "react-fast-marquee";
import { RiSearchLine, RiArrowRightLine } from "react-icons/ri";

export default function Banner() {
//   const carImages = [
//     "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400",
//     "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=400",
//     "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=400",
//     "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=400",
//     "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=400",
//     "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=400",
//   ];
const carImages = [
    "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400",
  ];

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between pt-24 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-[#0a0a0a] dark:via-[#0d0d0d] dark:to-[#121212]">
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f97316]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center px-4 z-10 mt-12 flex-1 flex flex-col justify-center items-center">
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[#f97316]/10 text-[#f97316] mb-6 uppercase">
          Premium Car Rental Experience
        </span>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-950 dark:text-white max-w-3xl leading-[1.15]">
          Find, Book, and Rent a Car in <span className="text-[#f97316]">Easy Steps</span>
        </h1>
        
        <p className="mt-6 text-base md:text-lg text-gray-600 dark:text-white/60 max-w-2xl">
          Get access to a luxury fleet of vehicles wherever you are. Transparent pricing, 24/7 support, and instant booking confirmation.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
          <Link
            href="/cars"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-8 py-3.5 rounded-xl font-medium transition-all shadow-lg shadow-[#f97316]/20 group"
          >
            Explore Cars
            <RiArrowRightLine className="text-lg group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="/cars"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white dark:bg-white/[0.05] hover:bg-gray-100 dark:hover:bg-white/[0.1] text-gray-900 dark:text-white border border-gray-200 dark:border-white/[0.08] px-8 py-3.5 rounded-xl font-medium transition-colors"
          >
            <RiSearchLine className="text-lg text-gray-500 dark:text-white/60" />
            Find Rental
          </Link>
        </div>
      </div>

      <div className="relative w-full pb-12 overflow-hidden pointer-events-none select-none">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-gray-50 via-gray-50/50 to-transparent dark:from-[#0d0d0d] dark:via-[#0d0d0d]/50 z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-gray-100 via-gray-100/50 to-transparent dark:from-[#121212] dark:via-[#121212]/50 z-20" />

        <Marquee speed={40} gradient={false} pauseOnHover={false}>
          <div className="flex gap-4 md:gap-6 pr-4 md:pr-6">
            {carImages.map((src, index) => (
              <div 
                key={index} 
                className="w-48 h-28 md:w-72 md:h-40 flex-shrink-0 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.08] shadow-md bg-gray-100 dark:bg-white/[0.02]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={src} 
                  alt="Rental Car" 
                  className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>

    </div>
  );
}