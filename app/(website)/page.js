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
import Smartphones from "@/components/Smartphones";
import Laptops from "@/components/Laptops";
import Accessories from "@/components/Accessories";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import PromoPopup from "@/components/PromoPopup";

export default function Home() {

  const { session, status } = useSession();
  const [promo, setPromo] = useState(true);

  return (
    <div className="relative flex flex-col gap-10 md:gap-14 bg-gray-100/70 pb-14">
      {/* <SearchBox /> */}

      {/* Hero */}
      <Hero />

      {/* <div className="flex flex-col items-center justify-center px-4 md:px-6">
        <h1 className="text-[19px] md:text-3xl font-bold text-center">
          Welcome to Harmony Stores NG{" "}
          <span className="font-normal">&#8482;</span>
        </h1>
        <p className="w-full max-w-2xl text-center text-sm mt-3 leading-6">
          We invite you to explore our wide range of products and experience our
          exceptional customer service firsthand. We are here to help you find the
          perfect solutions for your electronic needs.
        </p>
      </div> */}

      {/* Trending Collections */}
      {/* <TrendingCollections /> */}

      {/* Smartphones */}
      <Smartphones />

      {/* Laptops */}
      <Laptops />

      <div className="w-full px-4 md:px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-1/3 p-2">
            <Image
              src={"/assets/zfold-promotion-1.jpeg"}
              alt="Image"
              layout="responsive"
              width={500}
              height={500}
              className="object-cover"
            />
          </div>
          <div className="w-1/3 p-2">
            <Image
              src={"/assets/zfold-promotion-2.jpeg"}
              alt="Image"
              layout="responsive"
              width={500}
              height={500}
              className="object-cover"
            />
          </div>
          <div className="w-1/3 p-2">
            <Image
              src={"/assets/zfold-promotion-2.jpeg"}
              alt="Image"
              layout="responsive"
              width={500}
              height={500}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Accessories */}
      <Accessories />

      {/* New Arrivals */}
      {/* <NewArrivals /> */}

      {/* Trending Products */}
      {/* <TrendingProducts /> */}

      <BrandMarquee />

      {/* Customer Feedback */}
      {/* <CustomerFeedback /> */}

      {/* <div className="relative w-full h-[350px]">
        <Image
          src={"/assets/site-banner-1.png"}
          layout="fill"
          objectFit="contain"
        />
      </div> */}

      {/* Why Choose Use */}
      {/* <WhyChooseUs /> */}

      <PromoPopup />
    </div>
  );
}
