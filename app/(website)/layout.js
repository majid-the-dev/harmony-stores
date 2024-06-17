import { Inter, Poppins } from "next/font/google";
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
import 'animate.css';


const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Harmony Stores NG",
  description: "Harmony Stores NG",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/assets/dark--logo.png'/>
      </head>
      <body className={`${poppins.className}`}>
        <AppProvider>
          <ToasterProvider />
          <div>
            <Header />
            <div className="w-full h-1 gradient-bg"></div>
            <Navbar />
            <TopMarquee />
            {/* <ScrollingText /> */}
          </div>
          <main>{children}</main>
          <div>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
