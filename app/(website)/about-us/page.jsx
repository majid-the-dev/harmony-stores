import Link from "next/link";
import { FaAnglesRight } from "react-icons/fa6";

const page = () => {
  return (
    <div>
      <div className="bg-white flex items-center gap-3 text-[11px] md:text-xs border-b border-gray-200 shadow px-4 md:px-6 py-4">
        <Link href={"/"} className="font-medium">
          Home
        </Link>
        <FaAnglesRight className="font-medium" />
        <p className="text-gray-500 font-light">About us</p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-10 pt-14 pb-24 md:py-24 px-4 md:px-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="gradient-bg w-2 h-2"></div>
            <h1 className="text-xl md:text-2xl font-semibold">About us</h1>
          </div>
          <p className="text-xs text-gray-500 font-light leading-6 mt-3">
            Welcome to Harmony Stores NG, an innovative Nigerian retail
            technology company that prides itself on delivering top-quality
            computers, mobile phones, gadgets, and much more. Established in
            2010 as a single gadget retail store, we have grown exponentially to
            become a trusted provider of sales and services to millions of happy
            customers all over Nigeria.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="gradient-bg w-2 h-2"></div>
            <h1 className="text-xl md:text-2xl font-semibold">Our Journey</h1>
          </div>
          <p className="text-xs text-gray-500 font-light leading-6 mt-3">
            Our journey began in 2010, when we opened our first store with a
            simple goal: to bring cutting-edge technology to our local
            community. Since then, we have expanded our reach and now operate
            multiple locations across Nigeria.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="gradient-bg w-2 h-2"></div>
            <h1 className="text-xl md:text-2xl font-semibold">What We Offer</h1>
          </div>
          <p className="text-xs text-gray-500 font-light leading-6 mt-3">
            We offer a comprehensive range of products, including the latest
            smartphones, tablets, computers, and cameras from top brands.
            Whether you are a tech enthusiast looking for the newest gadgets or
            a professional seeking reliable equipment, we have something for
            everyone.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="gradient-bg w-2 h-2"></div>
            <h1 className="text-xl md:text-2xl font-semibold">Expertise and Support</h1>
          </div>
          <p className="text-xs text-gray-500 font-light leading-6 mt-3">
            We are experts in everything we sell. Our team of knowledgeable and
            friendly staff is always ready to assist you with any questions or
            concerns you may have. We provide detailed product information,
            personalized recommendations, and technical support to help you make
            informed decisions and get the most out of your purchases.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="gradient-bg w-2 h-2"></div>
            <h1 className="text-xl md:text-2xl font-semibold">Customer Satisfaction</h1>
          </div>
          <p className="text-xs text-gray-500 font-light leading-6 mt-3">
            Customer satisfaction is at the heart of everything we do. We are
            dedicated to providing a seamless shopping experience, from the
            moment you browse our website or walk into our store, to the moment
            you unbox your new gadget. We offer fast and reliable shipping, easy
            returns, and a responsive customer service team to ensure that you
            are completely satisfied with your purchase.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="gradient-bg w-2 h-2"></div>
            <h1 className="text-xl md:text-2xl font-semibold">Our Vision</h1>
          </div>
          <p className="text-xs text-gray-500 font-light leading-6 mt-3">
            Our vision is to be the leading retail technology company in
            Nigeria, known for our exceptional products, outstanding customer
            service, and unwavering commitment to innovation. We are constantly
            exploring new ways to enhance our offerings and provide even greater
            value to our customers.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="gradient-bg w-2 h-2"></div>
            <h1 className="text-xl md:text-2xl font-semibold">
              Join the Harmony Stores NG Family
            </h1>
          </div>
          <p className="text-xs text-gray-500 font-light leading-6 mt-3">
            Thank you for choosing Harmony Stores NG. We invite you to explore
            our wide range of products and experience our exceptional customer
            service firsthand. Whether you are shopping online or visiting one
            of our stores, we are here to help you find the perfect solutions
            for your electronic needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
