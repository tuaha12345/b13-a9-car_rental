"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';

import { 
  RiCarLine, 
  RiAddLine, 
  RiEditLine, 
  RiDeleteBinLine,
  RiCloseLine,
  RiGasStationLine,
  RiSteeringLine,
  RiUser3Line,
  RiMapPinLine
} from "react-icons/ri";
import { useSession } from "@/app/lib/auth-client";
import { authClient } from "@/app/lib/auth-client";

export default function MyAddedCarsPage() {
  const { data: session, isPending: sessionLoading } = useSession();
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCar, setEditingCar] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

  useEffect(() => {
    if (sessionLoading) return;
    if (!session?.user) {
      router.push("/login");
      return;
    }
    fetchUserCars();
  }, [session, sessionLoading, router]);

  const fetchUserCars = async () => {
    try {
      const {data:tokenData} = await authClient.token();
      const res = await fetch(`${API_URL}/cars/user/${session.user.id}`, {
        headers: {
          authorization: `Bearer ${tokenData?.token}`
        }
      });
      if (!res.ok) throw new Error("Failed to fetch your cars");
      const data = await res.json();
      setCars(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (carId) => {
    if (!confirm("Are you sure you want to delete this car?")) return;
    setDeletingId(carId);
    try {
      const {data:tokenData} = await authClient.token();
      const res = await fetch(`${API_URL}/cars/${carId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${tokenData?.token}`
        }
      });
      if (!res.ok) throw new Error("Delete failed");
      setCars(prev => prev.filter(c => c._id !== carId));
      toast.success("Car deleted successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const openEditModal = (car) => {
    setEditingCar(car);
    setEditForm({
      name: car.name,
      price: car.price,
      type: car.type || "",
      seats: car.seats,
      location: car.location || "",
      description: car.description || "",
      fuelType: car.fuelType || "Petrol",
      transmission: car.transmission || "Manual",
      image: car.image || "",
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const {data:tokenData} = await authClient.token();
      const res = await fetch(`${API_URL}/cars/${editingCar._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Update failed");
      await fetchUserCars();
      setEditingCar(null);
      toast.success("Car updated successfully");
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (sessionLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-[#f97316] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <div className="text-red-500">{error}</div>
        <button onClick={fetchUserCars} className="px-4 py-2 bg-[#f97316] text-white rounded-xl">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
              My Added Cars
            </h1>
            <p className="text-gray-500 dark:text-white/50 text-sm mt-1">
              Cars you have listed for rent
            </p>
          </div>
          <Link
            href="/add-car"
            className="flex items-center gap-2 px-4 py-2 bg-[#f97316] text-white rounded-xl hover:bg-[#ea580c] transition shadow-md"
          >
            <RiAddLine className="text-lg" />
            Add New Car
          </Link>
        </div>

        {cars.length === 0 ? (
          <div className="bg-white dark:bg-[#121212] rounded-2xl border border-gray-100 dark:border-white/[0.06] p-12 text-center shadow-sm">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#f97316]/10 flex items-center justify-center">
              <RiCarLine className="text-3xl text-[#f97316]" />
            </div>
            <p className="text-gray-500 dark:text-white/50 mb-4">You haven't added any cars yet.</p>
            <Link href="/add-car" className="inline-block px-5 py-2 bg-[#f97316] text-white rounded-xl hover:bg-[#ea580c] transition">
              Add Your First Car
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car) => (
              <div key={car._id} className="group bg-white dark:bg-[#121212] rounded-2xl border border-gray-100 dark:border-white/[0.06] overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="relative h-48 w-full bg-gray-100 dark:bg-white/[0.03]">
                  <Image
                    src={car.image || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400"}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => openEditModal(car)}
                      className="p-1.5 bg-white/90 dark:bg-black/70 rounded-lg text-gray-700 dark:text-white/80 hover:bg-[#f97316] hover:text-white transition"
                    >
                      <RiEditLine className="text-sm" />
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      disabled={deletingId === car._id}
                      className="p-1.5 bg-white/90 dark:bg-black/70 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition disabled:opacity-50"
                    >
                      <RiDeleteBinLine className="text-sm" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{car.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-white/40 mb-2">{car.type || "Standard"}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-white/60">
                      <RiMapPinLine className="text-[#f97316]" />
                      {car.location || "Dhaka"}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-white/60">
                      <RiUser3Line className="text-[#f97316]" />
                      {car.seats} seats
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 dark:border-white/[0.06]">
                    <div>
                      <span className="text-xs text-gray-400">Price/day</span>
                      <p className="text-base font-bold text-gray-900 dark:text-white">৳{car.price?.toLocaleString("en-BD")}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${car.availability ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                      {car.availability ? "Available" : "Booked"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#121212] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-gray-100 dark:border-white/[0.06]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Edit Car</h3>
              <button onClick={() => setEditingCar(null)} className="text-gray-400 hover:text-gray-600">
                <RiCloseLine className="text-2xl" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-white/70 mb-1">Car Name</label>
                <input type="text" name="name" value={editForm.name} onChange={handleEditChange} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] text-sm" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-white/70 mb-1">Price per day (৳)</label>
                  <input type="number" name="price" value={editForm.price} onChange={handleEditChange} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-white/70 mb-1">Seats</label>
                  <input type="number" name="seats" value={editForm.seats} onChange={handleEditChange} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] text-sm" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-white/70 mb-1">Type</label>
                  <input type="text" name="type" value={editForm.type} onChange={handleEditChange} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-white/70 mb-1">Location</label>
                  <input type="text" name="location" value={editForm.location} onChange={handleEditChange} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-white/70 mb-1">Fuel Type</label>
                  <select name="fuelType" value={editForm.fuelType} onChange={handleEditChange} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] text-sm">
                    <option>Petrol</option>
                    <option>Octane</option>
                    <option>Diesel</option>
                    <option>Electric</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-white/70 mb-1">Transmission</label>
                  <select name="transmission" value={editForm.transmission} onChange={handleEditChange} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] text-sm">
                    <option>Manual</option>
                    <option>Automatic</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-white/70 mb-1">Image URL</label>
                <input type="text" name="image" value={editForm.image} onChange={handleEditChange} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-white/70 mb-1">Description</label>
                <textarea name="description" rows="3" value={editForm.description} onChange={handleEditChange} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] text-sm"></textarea>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEditingCar(null)} className="flex-1 py-2 rounded-xl border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition">Cancel</button>
                <button type="submit" disabled={updating} className="flex-1 py-2 rounded-xl bg-[#f97316] text-white font-semibold hover:bg-[#ea580c] transition disabled:opacity-50">
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}