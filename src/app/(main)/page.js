import Image from "next/image";
import Link from "next/link";
import Banner from "../component/Banner";
import Card from "../component/Card";

export default async function Home() {
  const carsData = [
    {
      id: "1",
      name: "Toyota Premio 2020",
      brand: "Toyota",
      category: "Sedan",
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=400",
      fuelType: "Octane",
      transmission: "Automatic",
      seats: 5,
      pricePerDay: 4500,
      isAvailable: true
    },
    {
      id: "2",
      name: "Toyota Noah (Microbus)",
      brand: "Toyota",
      category: "MPV",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400",
      fuelType: "CNG/Octane",
      transmission: "Automatic",
      seats: 8,
      pricePerDay: 6000,
      isAvailable: false
    },
        {
      id: "2",
      name: "Toyota Noah (Microbus)",
      brand: "Toyota",
      category: "MPV",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400",
      fuelType: "CNG/Octane",
      transmission: "Automatic",
      seats: 8,
      pricePerDay: 6000,
      isAvailable: false
    },
        {
      id: "2",
      name: "Toyota Noah (Microbus)",
      brand: "Toyota",
      category: "MPV",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400",
      fuelType: "CNG/Octane",
      transmission: "Automatic",
      seats: 8,
      pricePerDay: 6000,
      isAvailable: false
    },
        {
      id: "2",
      name: "Toyota Noah (Microbus)",
      brand: "Toyota",
      category: "MPV",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400",
      fuelType: "CNG/Octane",
      transmission: "Automatic",
      seats: 8,
      pricePerDay: 6000,
      isAvailable: false
    }
  ];

  let data = await fetch('http://localhost:7000/cars');
  let cars = await data.json();

  return (
    <>
    <Banner></Banner>
        {/* <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Welcome to Car Rental App
      </h1>
    </div> */}
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cars.map((car) => (
        <Card key={car._id} car={car} />
      ))}
    </div>
    </>

  );
}
