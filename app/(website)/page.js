"use client";

import Image from "next/image";
import TrendingProducts from "../../components/TrendingProducts";
import { useSession } from "next-auth/react";
import WhyChooseUs from "@/components/WhyChooseUs";
import TrendingCollections from "@/components/TrendingCollections";
import CustomerFeedback from "@/components/CustomerFeedback";
import Hero from "@/components/Hero";
import NewArrivals from "@/components/NewArrivals";
import BrandMarquee from "@/components/BrandMarquee";
import { FiSearch } from "react-icons/fi";
import SearchBox from "@/components/SearchBox";

export default function Home() {
  const { session, status } = useSession();

  return (
    <div className="flex flex-col gap-10">
     <SearchBox />

      {/* Hero */}
      <Hero />

      {/* Trending Collections */}
      <TrendingCollections />

      {/* New Arrivals */}
      {/* <NewArrivals /> */}

      {/* Trending Products */}
      <TrendingProducts />

      <BrandMarquee />

      {/* Customer Feedback */}
      <CustomerFeedback />

      {/* <div className="relative w-full h-[350px]">
        <Image
          src={"/assets/site-banner-1.png"}
          layout="fill"
          objectFit="contain"
        />
      </div> */}

      {/* Why Choose Use */}
      <WhyChooseUs />
    </div>
  );
}
