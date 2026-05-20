import Image from "next/image";
import Link from "next/link";
import Banner from "../component/Banner";
import Card from "../component/Card";
import WhyChooseUs from "../component/WhyChooseUs";
import HowItWorks from "../component/HowItWorks";

export default async function Home() {


  let data = await fetch('http://localhost:9000/cars');
  let cars = await data.json();

  return (
    <>
    <Banner></Banner>
  
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cars.map((car) => (
        <Card key={car._id} car={car} />
      ))}
    </div>
          <WhyChooseUs />
      <HowItWorks />
    </>

  );
}
