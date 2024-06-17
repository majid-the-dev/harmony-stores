import Image from "next/image";
import Link from "next/link";
import React from "react";

const CheckoutUnauthenticated = () => {
  return (
    <div className="px-16 py-40">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={"/assets/shopping-bag.png"}
          height={100}
          width={100}
          alt="icon"
        />
        <p className="text-xl text-center font-semibold mt-5">
          Oops! You are not logged in
        </p>
        <p className="text-xs text-gray-500 text-center font-light leading-5 mt-2">
          Login or create account to save time at checkout!
        </p>
        <div className="inline-flex flex-col items-center gap-5 mt-6">
          <Link
            href={"/auth/sign-in"}
            className="animation bg-black text-white text-xs font-semibold rounded-lg px-5 py-3 hover:bg-black/80"
          >
            Sign In
          </Link>
          <p className="text-gray-500 text-xs font-light">
            Don&apos;t have an account yet?{" "}
            <span className="text-black font-semibold">
              <Link href={"/auth/sign-up"}>Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutUnauthenticated;
