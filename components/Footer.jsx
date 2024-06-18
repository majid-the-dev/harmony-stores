import Image from "next/image";
import Link from "next/link";
import { IoMdPin } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";

const Footer = () => {
  const date = new Date();
  return (
    <footer className="bg-black mx-auto px-6 pt-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-white text-xl md:text-2xl font-semibold">
          Subscribe to our Newsletter
        </h1>
        <p className="text-center text-white/80 text-xs mt-4 leading-5">
          Subscribe to our newsletter for exclusive deals, product updates, and
          tech tips.
        </p>
        {/* <p className="text-center text-xs text-white/80 mt-2.5">
          Join 1000+ subscribers today!
        </p> */}
        <form className="flex mt-10">
          <input
            type="text"
            placeholder="Enter your email address"
            className="bg-white w-full max-w-[40rem] text-sm font-semibold rounded-l-full outline-none px-6 py-3 placeholder:text-xs placeholder:font-normal"
          />
          <button className="gradient-bg text-white text-sm font-semibold rounded-r-full px-8">
            Subscribe
          </button>
        </form>
      </div>

      <div className="flex flex-col md:flex-row md:items-start gap-20 mt-28">
        <div className="flex flex-col w-full max-w-lg">
          <Image
            src={"/assets/dark--logo.png"}
            alt="logo"
            height={100}
            width={100}
          />
          <p className="text-white/80 text-xs leading-5 max-w-md mt-6">
            Welcome to Harmony Stores NG, an innovative Nigerian retail
            technology company that prides itself on delivering top-quality
            computers, mobile phones, gadgets, and much more. We believe that
            our customers deserve the best, and we strive to meet and exceed
            their expectations every day.
          </p>
          {/* <div className="flex items-center gap-3 mt-8">
            <Image
              src={"/assets/location-icon-2.png"}
              alt="icon"
              height={20}
              width={20}
            />
            <span className="text-white/80 text-xs max-w-sm leading-5">
              HIS GRACE PLAZA, 4 FRANCIS OREMEJI STREET, OFF SIMBIAT ABIOLA WAY,
              IKEJA, LAGOS
            </span>
          </div> */}
          {/* <p className="text-white/80 text-xs flex items-center gap-2.5 mt-5">
            <span>
              <BsFillTelephoneFill />
            </span>
            +2348077286191
          </p>
          <p className="text-white/80 text-xs flex items-center gap-2.5 mt-4">
            <span>
              <IoMail />
            </span>
            harmonystoresonline@gmail.com
          </p> */}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 w-full">
          <div className="col-span-1">
            <h1 className="text-white text-md font-semibold whitespace-nowrap">
              Quick Links
            </h1>
            <div className="flex flex-col gap-7 mt-8">
              <Link
                href={"/"}
                className="animation text-white/80 text-xs hover:translate-x-2"
              >
                Home
              </Link>
              <Link
                href={"/about-us"}
                className="animation text-white/80 text-xs hover:translate-x-2"
              >
                About Us
              </Link>
              <Link
                href={"/contact"}
                className="animation text-white/80 text-xs hover:translate-x-2"
              >
                Contact
              </Link>
              <Link
                href={"/stores"}
                className="animation text-white/80 text-xs hover:translate-x-2"
              >
                Stores
              </Link>
            </div>
          </div>
          <div className="col-span-1">
            <h1 className="text-white text-md font-semibold whitespace-nowrap">
              Account
            </h1>
            <div className="flex flex-col gap-7 mt-8">
              <Link
                href={"/profile"}
                className="animation text-white/80 text-xs hover:translate-x-2"
              >
                Profile
              </Link>
              <Link
                href={"/auth/sign-in"}
                className="animation text-white/80 text-xs hover:translate-x-2"
              >
                Login
              </Link>
              <Link
                href={"/auth/sign-up"}
                className="animation text-white/80 text-xs hover:translate-x-2"
              >
                Register
              </Link>
              <Link
                href={"/cart"}
                className="animation text-white/80 text-xs hover:translate-x-2"
              >
                Cart
              </Link>
            </div>
          </div>
          <div className="col-span-1">
            <h1 className="text-white text-md font-semibold whitespace-nowrap">
              Socials
            </h1>
            <div className="flex flex-col gap-7 mt-8">
              <Link
                href={"/"}
                className="animation text-white/80 text-xs hover:translate-x-2"
              >
                Instagram
              </Link>
              <Link
                href={"/"}
                className="animation text-white/80 text-xs hover:translate-x-2"
              >
                Facebook
              </Link>
              <Link
                href={"/"}
                className="animation text-white/80 text-xs hover:translate-x-2"
              >
                Twitter
              </Link>
              <Link
                href={"/"}
                className="animation text-white/80 text-xs hover:translate-x-22"
              >
                TikTok
              </Link>
              <Link
                href={"/"}
                className="animation text-white/80 text-xs hover:translate-x-2"
              >
                Threads
              </Link>
            </div>
          </div>
          <div className="col-span-1">
            <h1 className="text-white text-md font-semibold whitespace-nowrap">
              Legal
            </h1>
            <div className="flex flex-col gap-7 mt-8">
              <Link
                href={"/"}
                className="animation text-white/80 text-xs hover:translate-x-2"
              >
                Terms & Conditions
              </Link>
              <Link
                href={"/"}
                className="animation text-white/80 text-xs hover:translate-x-2"
              >
                Privacy Policy
              </Link>
              <Link
                href={"/"}
                className="animation text-white/80 text-xs hover:translate-x-2"
              >
                Warranty Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-20 py-12 border-t-[0.2px] border-gray-100/40">
        <p className="text-white/80 text-xs text-center leading-5">
          Copyright &copy; {date.getFullYear()} Harmony Group. <br /> All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
