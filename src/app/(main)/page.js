import Image from "next/image";
import Link from "next/link";
import Banner from "../component/Banner";
import Card from "../component/Card";
import WhyChooseUs from "../component/WhyChooseUs";
import HowItWorks from "../component/HowItWorks";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export default async function Home() {

  //   const {token} = await auth.api.getToken({
  //   headers: await headers()
  // });
  //  console.log(token);

  // let data = await fetch('http://localhost:9000/cars',{headers:{authorization:`Bearer ${token}`}});
   const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";
  let data = await fetch(`${API_URL}/cars`);
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
