"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  RiGasStationLine, 
  RiSteeringLine, 
  RiUser3Line, 
  RiArrowLeftLine,
  RiMapPinLine,
  RiCloseLine
} from "react-icons/ri";
import { useSession } from "@/app/lib/auth-client";

export default function CarDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [driverNeeded, setDriverNeeded] = useState("No");
  const [specialNote, setSpecialNote] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/cars/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Car not found");
        return res.json();
      })
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, API_URL]);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end < start) {
        setDateError("End date cannot be earlier than start date");
      } else {
        setDateError("");
      }
    } else {
      setDateError("");
    }
  }, [startDate, endDate]);

  const getDaysCount = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) return 0;
    const timeDiff = end - start;
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
    return days > 0 ? days : 0;
  };

  const daysCount = getDaysCount();
  const totalPrice = (car?.price || 0) * daysCount;
  const isBookingDisabled = !car?.availability || !startDate || !endDate || dateError !== "" || daysCount === 0 || bookingStatus === "processing";

  const handleBookingConfirm = async () => {
    if (!session?.user) {
      alert("Please login to book a car");
      router.push("/login");
      return;
    }

    setBookingStatus("processing");
    setShowModal(false);
    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: car._id,
          carName: car.name,
          carImage: car.image,
          pricePerDay: car.price,
          totalPrice: totalPrice,
          startDate: startDate,
          endDate: endDate,
          days: daysCount,
          userId: session.user.id,
          userName: session.user.name || session.user.email,
          userEmail: session.user.email,
          driverNeeded: driverNeeded,
          specialNote: specialNote,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Booking successful!");
        router.push("/my-bookings");
      } else {
        alert(result.message || "Booking failed");
        setBookingStatus("");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setBookingStatus("");
    }
  };

  const openModal = () => {
    if (!session?.user) {
      alert("Please login to book a car");
      router.push("/login");
      return;
    }
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-gray-600 dark:text-white/60">Loading...</div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <div className="text-red-500">{error || "Car not found"}</div>
        <Link href="/cars" className="text-[#f97316] hover:underline">← Back to cars</Link>
      </div>
    );
  }

  const fallbackImage = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-white/60 hover:text-[#f97316] mb-6 transition"
        >
          <RiArrowLeftLine /> Back to explore
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-[#121212] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/[0.06]">
            <div className="relative h-80 md:h-96 w-full">
              <Image
                src={car.image || fallbackImage}
                alt={car.name || "Car"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="bg-white dark:bg-[#121212] rounded-2xl border border-gray-100 dark:border-white/[0.06] p-6 md:p-8">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-[#f97316] bg-[#f97316]/10 px-3 py-1 rounded-full">
                  {car.type || "Standard"}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-950 dark:text-white mt-2">
                  {car.name}
                </h1>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                car.availability 
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}>
                {car.availability ? "Available" : "Not Available"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 py-4 border-y border-gray-100 dark:border-white/[0.06]">
              <div className="text-center">
                <RiGasStationLine className="mx-auto text-gray-500 dark:text-white/50 text-xl mb-1" />
                <p className="text-xs text-gray-400">Fuel</p>
                <p className="text-sm font-semibold">{car.fuelType || "Petrol"}</p>
              </div>
              <div className="text-center">
                <RiSteeringLine className="mx-auto text-gray-500 dark:text-white/50 text-xl mb-1" />
                <p className="text-xs text-gray-400">Transmission</p>
                <p className="text-sm font-semibold">{car.transmission || "Manual"}</p>
              </div>
              <div className="text-center">
                <RiUser3Line className="mx-auto text-gray-500 dark:text-white/50 text-xl mb-1" />
                <p className="text-xs text-gray-400">Seats</p>
                <p className="text-sm font-semibold">{car.seats || 4}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600 dark:text-white/70 text-sm mb-4">
              <RiMapPinLine className="text-[#f97316]" />
              {car.location || "Dhaka"}
            </div>

            <p className="text-gray-600 dark:text-white/70 text-sm leading-relaxed mb-6">
              {car.description || "No description provided."}
            </p>

            {car.owner && (
              <div className="text-xs text-gray-400 mb-6">
                Owner: <span className="text-gray-700 dark:text-white/80">{car.owner}</span>
              </div>
            )}

            <div className="border-t border-gray-100 dark:border-white/[0.06] pt-6">
              <div className="flex justify-between items-start mb-4 gap-4 flex-wrap">
                <div>
                  <span className="text-sm text-gray-400">Price per day</span>
                  <p className="text-2xl font-bold text-gray-950 dark:text-white">
                    ৳{car.price?.toLocaleString("en-BD") || 0}
                  </p>
                </div>
                <div className="flex gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.02] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.02] text-sm"
                    />
                  </div>
                </div>
              </div>
              {dateError && (
                <p className="text-red-500 text-xs mt-1 mb-2">{dateError}</p>
              )}
              {startDate && endDate && !dateError && daysCount > 0 && (
                <div className="text-sm text-gray-600 dark:text-white/70 mb-2">
                  Total days: {daysCount}
                </div>
              )}
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-gray-400">Total payable</span>
                <span className="text-xl font-bold text-[#f97316]">
                  ৳{totalPrice.toLocaleString("en-BD")}
                </span>
              </div>
              <button
                onClick={openModal}
                disabled={isBookingDisabled}
                className={`w-full py-3 rounded-xl font-semibold transition ${
                  !isBookingDisabled
                    ? "bg-[#f97316] hover:bg-[#ea580c] text-white"
                    : "bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                {bookingStatus === "processing" ? "Processing..." : 
                  !car.availability ? "Not Available" : 
                  !startDate || !endDate ? "Select Dates" : 
                  dateError ? "Invalid Dates" : "Book Now"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#121212] rounded-2xl max-w-md w-full mx-4 p-6 shadow-2xl border border-gray-100 dark:border-white/[0.06]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Confirm Booking</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white/70"
              >
                <RiCloseLine className="text-2xl" />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-gray-600 dark:text-white/70">
                <span className="font-semibold">Car:</span> {car.name}
              </p>
              <p className="text-gray-600 dark:text-white/70">
                <span className="font-semibold">Dates:</span> {startDate} → {endDate} ({daysCount} days)
              </p>
              <p className="text-gray-600 dark:text-white/70">
                <span className="font-semibold">Total Amount:</span> ৳{totalPrice.toLocaleString("en-BD")}
              </p>
              
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-white/70 mb-1">Driver Needed</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="driverNeeded" value="Yes" checked={driverNeeded === "Yes"} onChange={() => setDriverNeeded("Yes")} className="accent-[#f97316]" />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="driverNeeded" value="No" checked={driverNeeded === "No"} onChange={() => setDriverNeeded("No")} className="accent-[#f97316]" />
                    <span className="text-sm">No</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-white/70 mb-1">Special Note (optional)</label>
                <textarea
                  rows="2"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] text-sm resize-none"
                  placeholder="Any special requests or notes..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-xl border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition"
              >
                Cancel
              </button>
              <button
                onClick={handleBookingConfirm}
                className="flex-1 py-2 rounded-xl bg-[#f97316] text-white font-semibold hover:bg-[#ea580c] transition"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}