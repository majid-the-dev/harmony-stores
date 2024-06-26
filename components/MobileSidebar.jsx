// "use client";

// import { signOut, useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { FiMenu } from "react-icons/fi";
// import { HiOutlineShoppingBag } from "react-icons/hi";
// import { IoClose } from "react-icons/io5";
// import { FiLogIn } from "react-icons/fi";
// import { FaAngleRight, FaAnglesRight, FaAnglesDown } from "react-icons/fa6";
// import { FaAngleDown } from "react-icons/fa6";
// import { usePathname } from "next/navigation";

// const MobileSidebar = () => {

//   const { data: session, status, update } = useSession();

//   const path = usePathname();

//   const [sidebar, setSidebar] = useState(false);
//   const [animationClass, setAnimationClass] = useState("");

//   const openSidebar = () => {
//     setAnimationClass("animate__animated animate__fadeInLeft");
//     setSidebar(true);
//   };

//   const closeSidebar = () => {
//     setAnimationClass("animate__animated animate__fadeOutLeft");
//     setTimeout(() => {
//       setSidebar(false);
//     }, 500); // Adjust the timeout to match the animation duration
//   };

//   return (
//     <>
//       <button
//         onClick={openSidebar}
//         className="block md:hidden gradient-bg text-white text-md rounded p-1 outline-none"
//       >
//         <FiMenu />
//       </button>

//       {sidebar && (
//         <div
//           className={`bg-white fixed inset-0 z-50 backdrop-blur-3xl overflow-y-scroll ${animationClass}`}
//         >
//           <div className="h-full w-full relative">
//             <div className="w-full h-2 bg-black"></div>
//             <div className="flex items-center justify-between shadow-md px-3 py-3">
//               <Image
//                 src={"/assets/dark--logo.png"}
//                 alt="logo"
//                 height={120}
//                 width={120}
//               />
//               <button
//                 onClick={closeSidebar}
//                 className=" text-xl"
//               >
//                 <IoClose />
//               </button>
//             </div>
//             <div className="flex text-black text-[13px] font-semibold pt-5 pb-12">
//               <div className="w-full flex flex-col gap-3">
//                 <Link href={"/"} onClick={closeSidebar} className={`${path === "/" && 'bg-white/25'} animation w-full flex items-center justify-between p-4 hover:bg-white/25`}>
//                     Home
//                     <FaAnglesRight className="text-[11px]" />
//                 </Link>
//                 <Link href={"/about-us"} onClick={closeSidebar} className={`${path === "/about-us" && 'bg-white/25'} animation w-full flex items-center justify-between p-4 hover:bg-white/25`}>
//                     About Us
//                     <FaAnglesRight className="text-[11px]" />
//                 </Link>
//                 <Link href={"/contact"} onClick={closeSidebar} className={`${path === "/contact" && 'bg-white/25'} animation w-full flex items-center justify-between p-4 hover:bg-white/25`}>
//                     Contact
//                     <FaAnglesRight className="text-[11px]" />
//                 </Link>
//                 <Link href={"/stores"} onClick={closeSidebar} className={`${path === "/stores" && 'bg-white/25'} animation w-full flex items-center justify-between p-4 hover:bg-white/25`}>
//                     Stores
//                     <FaAnglesRight className="text-[11px]" />
//                 </Link>
//                 <button className="animation w-full flex items-center justify-between p-4 hover:bg-white/25">
//                     Categories
//                     <FaAnglesDown className="text-[11px]" />
//                 </button>
//               </div>
//             </div>
//             <div className="absolute bottom-4 w-full px-4">
//               <div className="flex items-center gap-4">
//                 {status === "authenticated" ? (
//                   <button className="animation w-full flex items-center justify-center gap-3 text-center bg-white/15 text-white text-xs font-semibold py-3 border border-white/30 hover:opacity-80">
//                     <FiLogIn className="text-sm rotate-180" />
//                     Sign Out
//                   </button>
//                 ) : (
//                   <Link
//                     onClick={closeSidebar}
//                     href={"/auth/sign-in"}
//                     className="animation w-full flex items-center justify-center gap-3 text-center bg-white/15 text-white text-xs font-semibold py-3 border border-white/30 hover:opacity-80"
//                   >
//                     <FiLogIn className="text-sm" />
//                     Sign In
//                   </Link>
//                 )}
//                 <Link onClick={closeSidebar} href={'/cart'} className="animation w-full flex items-center justify-center gap-3 bg-white/15 text-white text-xs font-semibold py-3 border border-white/30 hover:opacity-80">
//                     <HiOutlineShoppingBag className="text-sm" />
//                     Cart (0)
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MobileSidebar;

"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { FaAngleRight, FaAnglesRight, FaAnglesDown } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { FiPlus, FiMinus } from "react-icons/fi";
import MobileCategoryItem from "./MobileCategoryItem";

const MobileSidebar = ({ categories }) => {

  const { data: session, status, update } = useSession();
  const date = new Date();

  const path = usePathname();

  const [sidebar, setSidebar] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const openSidebar = () => {
    setAnimationClass("animate__animated animate__fadeInLeft");
    setSidebar(true);
  };

  const closeSidebar = () => {
    setAnimationClass("animate__animated animate__fadeOutLeft");
    setTimeout(() => {
      setSidebar(false);
    }, 500); // Adjust the timeout to match the animation duration
  };

  return (
    <>
      <button
        onClick={openSidebar}
        className="block md:hidden text-black text-lg p-1 outline-none"
      >
        <FiMenu />
      </button>

      {sidebar && (
        <div
          onClick={closeSidebar}
          className={`bg-black/90 fixed inset-0 z-50 ${animationClass}`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white w-2/3 h-full p-4 overflow-y-scroll"
          >
            {/* <Image src={'/assets/dark--logo.png'} alt="logo" height={120} width={120} /> */}
            <div className="flex flex-col items-start text-[13px]">
              <Link
                href={"/"}
                className="w-full font-medium border-b border-gray-300/60 py-4"
              >
                Home
              </Link>
              <Link
                href={"/"}
                className="w-full font-medium border-b border-gray-300/60 py-4"
              >
                About Us
              </Link>
              <Link
                href={"/"}
                className="w-full font-medium border-b border-gray-300/60 py-4"
              >
                Contact
              </Link>
              <Link
                href={"/"}
                className="w-full font-medium border-b border-gray-300/60 py-4"
              >
                Stores
              </Link>
              <div className="w-full border-b border-gray-300/60">
                <button
                  onClick={() => setShowCategories(!showCategories)}
                  className="w-full flex items-center justify-between text-left text-[13px] font-medium py-4"
                >
                  Categories
                  <span>{showCategories ? <FiMinus /> : <FiPlus />}</span>
                </button>
                {showCategories && (
                  <div className="flex flex-col gap-6 mt-2 mb-6">
                    {categories?.map((category) => (
                      <MobileCategoryItem
                        key={category._id}
                        category={category}
                        closeSidebar={closeSidebar}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* <button className="absolute top-4 -right-10 text-white text-[22px] rounded-full p-1" onClick={closeSidebar}>
              <IoClose />
            </button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSidebar;
