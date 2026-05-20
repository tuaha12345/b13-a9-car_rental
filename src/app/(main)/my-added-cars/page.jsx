"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/lib/auth-client";
import Card from "@/app/component/Card";
import { RiCarLine, RiAddLine } from "react-icons/ri";

export default function MyAddedCarsPage() {
  const { data: session, isPending: sessionLoading } = useSession();
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

  useEffect(() => {
    if (sessionLoading) return;
    if (!session?.user) {
      router.push("/login");
      return;
    }

    const fetchUserCars = async () => {
      try {
        const res = await fetch(`${API_URL}/cars/user/${session.user.id}`);
        if (!res.ok) throw new Error("Failed to fetch your cars");
        const data = await res.json();
        setCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCars();
  }, [session, sessionLoading, router, API_URL]);

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
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-[#f97316] text-white rounded-xl">
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
            <Link
              href="/add-car"
              className="inline-block px-5 py-2 bg-[#f97316] text-white rounded-xl hover:bg-[#ea580c] transition"
            >
              Add Your First Car
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car) => (
              <Card key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}