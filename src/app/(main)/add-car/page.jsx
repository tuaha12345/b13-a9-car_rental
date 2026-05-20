
"use client";

import { useState } from "react";
import { 
  RiCarLine, 
  RiMoneyDollarCircleLine, 
  RiMapPinLine, 
  RiUser3Line, 
  RiImageLine, 
  RiFileTextLine,
  RiCheckboxCircleLine
} from "react-icons/ri";
import { authClient } from "@/app/lib/auth-client";

export default function AddCar() {

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    image: "",
    seats: 5,
    location: "",
    description: "",
    availability: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formEl = e.currentTarget;
    const rawData = Object.fromEntries(new FormData(formEl).entries());
    const carData = {
      owner_id: user?.id,
      name: rawData.name,
      price: Number(rawData.price),
      type: rawData.type,
      image: rawData.image,
      seats: Number(rawData.seats),
      location: rawData.location,
      description: rawData.description,
      availability: formEl.availability.checked,
      owner: session?.user?.email || "anonymous@test.com", 
      booking_count: 0
    };

    console.log("Submitting to Server:", carData);

    try {
      const res = await fetch(`http://localhost:9000/cars`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(carData)
      });

      if (res.ok) {
        const result = await res.json();
        console.log("Server Response:", result);
        alert("Car added successfully!");

        setFormData({
          name: "",
          price: "",
          type: "",
          image: "",
          seats: 5,
          location: "",
          description: "",
          availability: true,
        });
      } else {
        alert("Failed to add car. Server error.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pt-24 pb-16 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4">
        
        <div className="bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-6 md:p-8 shadow-xl shadow-gray-100/50 dark:shadow-none">
          
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950 dark:text-white">
              Add New <span className="text-[#f97316]">Car</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-white/40 mt-1">
              Fill up the form below to list a vehicle for rent.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-white/70 uppercase tracking-wider block mb-2">
                  Car Name / Model
                </label>
                <div className="relative">
                  <RiCarLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. BMW 5 Series"
                    required
                    className="w-full bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#f97316] dark:focus:border-[#f97316] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-white/70 uppercase tracking-wider block mb-2">
                  Daily Rent Price ($ / ৳)
                </label>
                <div className="relative">
                  <RiMoneyDollarCircleLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 200"
                    required
                    className="w-full bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#f97316] dark:focus:border-[#f97316] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-white/70 uppercase tracking-wider block mb-2">
                  Car Type (SUV / Sedan / Hatchback / Luxury)
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-gray-50  border border-gray-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#f97316] dark:focus:border-[#f97316] outline-none transition-colors appearance-none"
                >
                  <option value="Luxury" className="">Luxury</option>
                  <option value="Sedan" className="">Sedan</option>
                  <option value="SUV" className="">SUV</option>
                  <option value="Hatchback" className="">Hatchback</option>
                  <option value="Microbus" className="">Microbus</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-white/70 uppercase tracking-wider block mb-2">
                  Seat Capacity
                </label>
                <div className="relative">
                  <RiUser3Line className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="number"
                    name="seats"
                    value={formData.seats}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    required
                    className="w-full bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#f97316] dark:focus:border-[#f97316] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-600 dark:text-white/70 uppercase tracking-wider block mb-2">
                  Image URL (imgbb/postimage)
                </label>
                <div className="relative">
                  <RiImageLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="e.g. https://i.ibb.co/.../bmw.jpg"
                    required
                    className="w-full bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#f97316] dark:focus:border-[#f97316] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-600 dark:text-white/70 uppercase tracking-wider block mb-2">
                  Pickup Location
                </label>
                <div className="relative">
                  <RiMapPinLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Dhaka"
                    required
                    className="w-full bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#f97316] dark:focus:border-[#f97316] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-600 dark:text-white/70 uppercase tracking-wider block mb-2">
                  Description
                </label>
                <div className="relative">
                  <RiFileTextLine className="absolute left-3.5 top-3 text-gray-400 text-lg" />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Luxury sedan with premium comfort..."
                    required
                    className="w-full bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#f97316] dark:focus:border-[#f97316] outline-none transition-colors resize-none"
                  />
                </div>
              </div>

            </div>

            <div className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                id="availability"
                name="availability"
                checked={formData.availability}
                onChange={handleChange}
                className="w-4 h-4 text-[#f97316] border-gray-300 rounded focus:ring-[#f97316] cursor-pointer"
              />
              <label htmlFor="availability" className="text-sm font-medium text-gray-700 dark:text-white/80 cursor-pointer select-none">
                Availability Status (Available instantly)
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-[#f97316]/10"
            >
              Submit Vehicle Listing
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}