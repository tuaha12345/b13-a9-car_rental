"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import Image from "next/image";
import { RiCarFill, RiMenuLine, RiCloseLine } from "react-icons/ri";

export default function AppNavbar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/explore_cars", label: "Explore Cars" },
    ...(user ? [{ href: "/my-bookings", label: "My Bookings" }] : []),
  ];

  const isActive = (href) => pathname === href;

  if (isPending) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 w-full h-16 bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-white/[0.06]" />
    );
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-[#0d0d0d]/90 backdrop-blur-xl border-b border-gray-200 dark:border-white/[0.06] shadow-md"
          : "bg-white dark:bg-transparent border-b border-gray-100 dark:border-transparent"
      }`}
    >
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden text-gray-700 dark:text-white/70 hover:text-black dark:hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <RiCloseLine className="text-2xl" /> : <RiMenuLine className="text-2xl" />}
            </button>

            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-[#f97316] rounded-lg">
                <RiCarFill className="text-white text-lg" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                Drive<span className="text-[#f97316]">Fleet</span>
              </span>
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "text-[#f97316]"
                    : "text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.05]"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#f97316] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {!user ? (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-medium text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white">
                  Login
                </Link>
                <Link href="/register" className="hidden md:block text-sm font-medium bg-[#f97316] text-white px-4 py-2 rounded-xl hover:bg-[#ea580c]">
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/[0.05]"
                >
                  {user.image ? (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#f97316]/40">
                      <Image src={user.image} alt={user.name || "User"} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#f97316] ring-2 ring-[#f97316]/40 flex items-center justify-center text-white text-xs font-bold uppercase">
                      {user.name ? user.name.charAt(0) : "U"}
                    </div>
                  )}
                  <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-white/80 max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#141414] border border-gray-200 dark:border-white/[0.08] rounded-xl shadow-2xl p-1 z-50">
                    <div className="px-3 py-2 border-b border-gray-100 dark:border-white/[0.06]">
                      <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-gray-500 dark:text-white/40 truncate">{user.email}</p>
                    </div>
                    <Link href="/my-bookings" className="block px-3 py-2 text-sm text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/[0.05] rounded-lg" onClick={() => setDropdownOpen(false)}>
                      My Bookings
                    </Link>
                     <Link href="/add-car" className="block px-3 py-2 text-sm text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/[0.05] rounded-lg" onClick={() => setDropdownOpen(false)}>
                      Add Car
                    </Link>
                    <Link href="/my-added-cars" className="block px-3 py-2 text-sm text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/[0.05] rounded-lg" onClick={() => setDropdownOpen(false)}>
                      My Added Cars
                    </Link>
                    <button className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50/10 rounded-lg font-medium" onClick={handleSignOut}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-16 bg-white dark:bg-[#0d0d0d]/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/[0.06] pt-4 pb-6 px-4 flex flex-col gap-1 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                isActive(link.href)
                  ? "bg-[#f97316]/10 text-[#f97316]"
                  : "text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/[0.04]"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-[1px] bg-gray-200 dark:bg-white/[0.06] my-2" />
          {user ? (
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50/10" onClick={handleSignOut}>
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/[0.04]" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link href="/register" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-[#f97316] text-white" onClick={() => setMobileMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}