"use client";

import Link from "next/link";
import { 
  RiCarFill, 
  RiFacebookCircleLine, 
  RiTwitterXLine, 
  RiInstagramLine, 
  RiLinkedinBoxLine 
} from "react-icons/ri";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#0d0d0d] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-[#f97316] rounded-lg">
                <RiCarFill className="text-white text-lg" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                Drive<span className="text-[#f97316]">Fleet</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-white/40 leading-relaxed">
              Experience the easiest way to rent a car in Bangladesh. Luxury fleets, affordable pricing, and trusted service.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/" className="text-sm text-gray-600 dark:text-white/60 hover:text-[#f97316] dark:hover:text-[#f97316] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cars" className="text-sm text-gray-600 dark:text-white/60 hover:text-[#f97316] dark:hover:text-[#f97316] transition-colors">
                  Explore Cars
                </Link>
              </li>
              <li>
                <Link href="/add-car" className="text-sm text-gray-600 dark:text-white/60 hover:text-[#f97316] dark:hover:text-[#f97316] transition-colors">
                  Add Car
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="text-sm text-gray-600 dark:text-white/60 hover:text-[#f97316] dark:hover:text-[#f97316] transition-colors">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Legal
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="#" className="text-sm text-gray-600 dark:text-white/60 hover:text-[#f97316] dark:hover:text-[#f97316] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 dark:text-white/60 hover:text-[#f97316] dark:hover:text-[#f97316] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 dark:text-white/60 hover:text-[#f97316] dark:hover:text-[#f97316] transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Connect With Us
            </h4>
            <div className="flex items-center gap-3 mb-4">
              <a href="#" className="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-white/60 hover:text-[#f97316] dark:hover:text-[#f97316] hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-all">
                <RiFacebookCircleLine className="text-xl" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-white/60 hover:text-[#f97316] dark:hover:text-[#f97316] hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-all">
                <RiTwitterXLine className="text-lg" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-white/60 hover:text-[#f97316] dark:hover:text-[#f97316] hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-all">
                <RiInstagramLine className="text-xl" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-white/60 hover:text-[#f97316] dark:hover:text-[#f97316] hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-all">
                <RiLinkedinBoxLine className="text-xl" />
              </a>
            </div>
            <p className="text-xs text-gray-500 dark:text-white/40">
              Support: support@drivefleet.com
            </p>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 dark:text-white/40 text-center sm:text-left">
            &copy; {currentYear} DriveFleet. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-white/20 text-center sm:text-right">
            Made in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}