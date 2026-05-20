"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  RiCalendarLine, 
  RiMoneyDollarCircleLine, 
  RiCloseCircleLine,
  RiCheckboxCircleLine,
  RiTimeLine,
  RiArrowLeftLine,
  RiCarLine,
  RiMapPinLine
} from "react-icons/ri";
import { useSession } from "@/app/lib/auth-client";

export default function MyBookingsPage() {
  const { data: session, isPending: sessionLoading } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

  useEffect(() => {
    if (sessionLoading) return;
    if (!session?.user) {
      router.push("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_URL}/bookings/user/${session.user.id}`);
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session, sessionLoading, router, API_URL]);

  const cancelBooking = async (bookingId, carId) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    setCancellingId(bookingId);
    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Cancellation failed");
      setBookings(prev => prev.filter(b => b._id !== bookingId));
      alert("Booking cancelled successfully");
    } catch (err) {
      alert(err.message);
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-BD", {
      year: "numeric", month: "short", day: "numeric"
    });
  };

  if (sessionLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#f97316] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-white/50 text-sm">Loading your journeys...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] flex flex-col items-center justify-center gap-4">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-6 py-3 rounded-xl text-sm">
          {error}
        </div>
        <Link href="/" className="text-[#f97316] hover:underline flex items-center gap-1">
          <RiArrowLeftLine /> Return home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#121212] text-gray-600 dark:text-white/70 hover:text-[#f97316] shadow-sm border border-gray-100 dark:border-white/[0.06] transition-all hover:shadow-md"
          >
            <RiArrowLeftLine className="text-sm" /> Dashboard
          </Link>
          <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            My Bookings
          </h1>
          <div className="w-24"></div>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white dark:bg-[#121212] rounded-2xl border border-gray-100 dark:border-white/[0.06] p-12 text-center shadow-xl">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#f97316]/10 flex items-center justify-center">
              <RiCarLine className="text-3xl text-[#f97316]" />
            </div>
            <p className="text-gray-500 dark:text-white/50 mb-4">No bookings yet. Start your first adventure!</p>
            <Link
              href="/cars"
              className="inline-block px-6 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-xl transition-all shadow-lg shadow-[#f97316]/20 font-medium"
            >
              Explore Cars
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="group bg-white dark:bg-[#121212] rounded-2xl border border-gray-100 dark:border-white/[0.06] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-56 h-48 md:h-auto bg-gray-100 dark:bg-white/[0.03] overflow-hidden">
                    <Image
                      src={booking.carImage || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400"}
                      alt={booking.carName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 224px"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
                        booking.status === "confirmed"
                          ? "bg-green-500/90 text-white shadow-sm"
                          : "bg-red-500/90 text-white"
                      }`}>
                        {booking.status === "confirmed" ? "✓ CONFIRMED" : "✗ CANCELLED"}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap justify-between items-start gap-3">
                        <div>
                          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            {booking.carName}
                          </h2>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-white/40">
                            <RiMapPinLine className="text-[#f97316]" />
                            <span>Booking ref: {booking._id.slice(-8).toUpperCase()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
                        <div className="flex items-center gap-2.5 text-sm bg-gray-50 dark:bg-white/[0.02] rounded-xl px-3 py-2">
                          <div className="w-7 h-7 rounded-lg bg-[#f97316]/10 flex items-center justify-center">
                            <RiCalendarLine className="text-[#f97316] text-sm" />
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-400 uppercase">Period</p>
                            <p className="text-xs font-medium text-gray-700 dark:text-white/80">
                              {formatDate(booking.startDate)} – {formatDate(booking.endDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 text-sm bg-gray-50 dark:bg-white/[0.02] rounded-xl px-3 py-2">
                          <div className="w-7 h-7 rounded-lg bg-[#f97316]/10 flex items-center justify-center">
                            <RiTimeLine className="text-[#f97316] text-sm" />
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-400 uppercase">Duration</p>
                            <p className="text-xs font-medium text-gray-700 dark:text-white/80">
                              {booking.totalDays} {booking.totalDays === 1 ? "day" : "days"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 text-sm bg-gray-50 dark:bg-white/[0.02] rounded-xl px-3 py-2">
                          <div className="w-7 h-7 rounded-lg bg-[#f97316]/10 flex items-center justify-center">
                            <RiMoneyDollarCircleLine className="text-[#f97316] text-sm" />
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-400 uppercase">Total paid</p>
                            <p className="text-xs font-bold text-gray-900 dark:text-white">
                              ৳{booking.totalPrice?.toLocaleString("en-BD")}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 text-sm bg-gray-50 dark:bg-white/[0.02] rounded-xl px-3 py-2">
                          <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <RiCheckboxCircleLine className="text-green-600 dark:text-green-400 text-sm" />
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-400 uppercase">Payment</p>
                            <p className="text-xs font-medium text-green-600 dark:text-green-400">Completed</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {booking.status === "confirmed" && (
                      <div className="mt-5 flex justify-end border-t border-gray-100 dark:border-white/[0.06] pt-4">
                        <button
                          onClick={() => cancelBooking(booking._id, booking.carId)}
                          disabled={cancellingId === booking._id}
                          className="flex items-center gap-1.5 px-5 py-2 text-sm font-semibold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white rounded-xl transition-all duration-200 disabled:opacity-50"
                        >
                          <RiCloseCircleLine className="text-base" />
                          {cancellingId === booking._id ? "Cancelling..." : "Cancel Booking"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}