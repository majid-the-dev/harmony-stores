// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { HiMenuAlt2 } from "react-icons/hi";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const fetchCategories = async () => {
//   const response = await fetch('/api/parent-categories'); // Ensure this is the correct API route
//   const data = await response.json();
//   return data;
// };

// const renderCategoryTree = (category) => {
//   if (category.children.length > 0) {
//     return (
//       <AccordionItem key={category._id} value={category._id.toString()}>
//         <AccordionTrigger className="text-sm font-medium hover:no-underline">
//           <Link href={`/categories/${category._id}`} className="block w-full text-left">
//             {category.name}
//           </Link>
//         </AccordionTrigger>
//         <AccordionContent>
//           <div className="pl-4">
//             {category.children.map(subcategory => (
//               <div key={subcategory._id}>
//                 {renderCategoryTree(subcategory)}
//               </div>
//             ))}
//           </div>
//         </AccordionContent>
//       </AccordionItem>
//     );
//   } else {
//     return (
//       <div key={category._id} className="text-sm font-medium hover:no-underline py-2">
//         <Link href={`/categories/${category._id}`} className="block w-full text-left">
//           {category.name}
//         </Link>
//       </div>
//     );
//   }
// };

// const MobileNav = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const getCategories = async () => {
//       const data = await fetchCategories();
//       setCategories(data);
//     };

//     getCategories();
//   }, []);

//   return (
//     <div>
//       <Sheet>
//         <SheetTrigger>
//           <HiMenuAlt2 className="block md:hidden text-2xl" />
//         </SheetTrigger>
//         <SheetContent side="left" className="bg-white border-none p-0">
//           <div className="bg-default px-3 py-4">
//             <h1 className="text-sm font-semibold">All Categories</h1>
//           </div>
//           <div className="">
//             <nav className="flex flex-col items-start p-3">
//               <Accordion type="single" collapsible className="w-full">
//                 {categories.map(category => (
//                   <div key={category._id} className="w-full">
//                     {renderCategoryTree(category)}
//                   </div>
//                 ))}
//               </Accordion>
//             </nav>
//           </div>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// };

// export default MobileNav;

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HiMenuAlt2 } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const fetchCategories = async () => {
  const response = await fetch("/api/parent-categories"); // Ensure this is the correct API route
  const data = await response.json();
  return data;
};

const renderCategoryTree = (category) => {
  if (category.children.length > 0) {
    return (
      <AccordionItem key={category._id} value={category._id.toString()}>
        <AccordionTrigger className="text-sm font-semibold hover:no-underline">
          <Link href={`/category/${category._id}`}>
            <SheetClose>{category.name}</SheetClose>
          </Link>
        </AccordionTrigger>
        <AccordionContent>
          <div className="pl-4 space-y-6">
            {category.children.map((subcategory) => (
              <div key={subcategory._id}>
                {subcategory.children.length > 0 ? (
                  <Accordion type="single" collapsible>
                    {renderCategoryTree(subcategory)}
                  </Accordion>
                ) : (
                  <Link
                    href={`/category/${subcategory._id}`}
                    className="text-sm font-semibold"
                  >
                    <SheetClose>{subcategory.name}</SheetClose>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  } else {
    return (
      <div
        key={category._id}
        className="text-sm font-medium hover:no-underline py-2 my-2"
      >
        <Link
          href={`/category/${category._id}`}
          className="block w-full text-left font-semibold"
        >
          <SheetClose>{category.name}</SheetClose>
        </Link>
      </div>
    );
  }
};

const MobileNav = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };

    getCategories();
  }, []);

  return (
    <div>
      <Sheet>
        <SheetTrigger className="block md:hidden gradient-bg text-white text-md rounded p-1 outline-none">
          <FiMenu />
        </SheetTrigger>
        <SheetContent side="left" className="bg-gray-100 border-none p-0">
          <Image
            src={"/assets/dark--logo.png"}
            alt="logo"
            height={140}
            width={140}
          />
          {/* <div className="">
            <nav className="flex flex-col items-start p-3">
              <Accordion type="single" collapsible className="w-full">
                {categories.map((category) => (
                  <div key={category._id} className="w-full">
                    {renderCategoryTree(category)}
                  </div>
                ))}
              </Accordion>
            </nav>
          </div> */}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
