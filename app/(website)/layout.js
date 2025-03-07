import { Inter, Poppins, Montserrat } from "next/font/google";
import "../globals.css";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import ToasterProvider from "@/utils/ToasterProvider";
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";
import { AppProvider } from "@/components/AppContext";
import ScrollingText from "@/components/ScrollingText";
import TopMarquee from "@/components/TopMarquee";
import "animate.css";
import SearchBox from "@/components/SearchBox";
import Link from "next/link";
import Image from "next/image";
import { LuTruck } from "react-icons/lu";
import { Analytics } from "@vercel/analytics/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryProvider } from "@/utils/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Harmony Stores NG",
  description: "Harmony Stores NG",
  icons: {
    icon: "/assets/favicon.png",
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </head>
      <body className={`${montserrat.className} relative`}>
        <AppProvider>
          <ReactQueryProvider>
            <ToasterProvider />
            <div>
              {/* <Header /> */}
              {/* <div className="w-full flex items-center justify-center gap-2 h-4 text-black text-[12px] font-semibold py-5">
              <LuTruck className="text-[14px]" />
              Free delivery in Lagos and FCT
            </div> */}
              {/* <div className="w-full h-1 gradient-bg"></div> */}
              <Navbar />
              <TopMarquee />
              <SearchBox />
              {/* <ScrollingText /> */}
            </div>
            <main>{children}</main>
            <div>
              <Footer />
            </div>
          </ReactQueryProvider>
        </AppProvider>
        {/* <Link target="_blank" href={"https://wa.me/+2348077286191/"} className="md:bg-white fixed flex items-center gap-1 bottom-8 right-4 z-50 rounded-full md:px-4 md:py-2">
          <Image src={'/assets/whatsapp-icon.png'} width={60} height={60} alt="icon" />
          <span className="text-xs font-semibold hidden md:block">How can we help you?</span>
        </Link> */}
        <Link
          target="_blank"
          href={"https://wa.me/+2348182012345/"}
          className="fixed bottom-8 right-4 z-50"
        >
          <Image
            src={"/assets/whatsapp-icon.png"}
            width={60}
            height={60}
            alt="icon"
          />
          <span className="absolute -top-1 right-0 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
            1
          </span>
        </Link>
        <Analytics />
      </body>
    </html>
  );
}
