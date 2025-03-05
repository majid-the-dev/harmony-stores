"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import Inbox from "@/public/assets/newsletter-inbox-asset.png";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
  };

  return (
    <div className="w-full bg-black py-7 px-4 md:px-0 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center flex-col md:flex-row gap-8 md:gap-0">
          <Image
            src={Inbox}
            className="h-72 md:h-36 w-60 md:w-36"
            alt="Newsletter"
          />
          <div className="text-white">
            <h2 className="text-lg font-semibold text-center md:text-left">
              Amazing deals waiting for you!
            </h2>
            <p className="text-sm text-gray-300 text-center md:text-left">
              Subscribe and grab 20% OFF!
            </p>
            <p className="text-[10px] text-gray-300 mt-4 text-center md:text-left">
              * Terms and conditions apply!
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 max-w-xl hidden md:flex gap-2 items-center"
        >
          <div className="flex-1">
            <input
              type="email"
              placeholder="Your email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-full bg-white/20 text-sm text-white placeholder:text-gray-400 border border-[#2a3b35] focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-white/20 text-sm text-white hover:bg-[#344741] transition-colors font-semibold border border-white/20"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
