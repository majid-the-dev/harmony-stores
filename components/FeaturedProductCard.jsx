// import { formatPrice } from "@/lib/utils";
// import Image from "next/image";
// import Link from "next/link";
// import { BsFillStarFill } from "react-icons/bs";

// const FeaturedProductCard = ({ product, link, usage }) => {
//   return (
//     <Link
//       href={link}
//       className="animation bg-gray-100/40 w-full relative flex flex-col md:flex-row items-center gap-3 border border-gray-200/60 hover:shadow-md rounded-lg px-5 py-8"
//     >
//       <div className="relative h-36 md:h-24 w-36 md:w-24">
//         <Image
//           src={product.images[0]}
//           layout="fill"
//           objectFit="contain"
//           className="rounded-lg"
//           alt="product"
//         />
//       </div>
//       <div className="flex flex-col items-center md:items-start gap-2.5">
//         <h1 className="text-sm text-center md:text-left font-semibold line-clamp-2">{product.title}</h1>
//         {product.discount ? (
//           <>
//             <div className="flex flex-col md:flex-row items-start md:items-center gap-3 ">
//               <p className="text-sm font-semibold">
//                 &#8358; {formatPrice(product.discount)}
//               </p>
//               <p className="text-gray-500 text-xs font-medium line-through">
//                 &#8358; {formatPrice(product.price)}
//               </p>
//             </div>
//             <p className="text-red-600 text-xs font-normal">
//               You save &#8358; {formatPrice(product.price - product.discount)}
//             </p>
//           </>
//         ) : (
//           <p className="text-sm font-semibold whitespace-nowrap">
//             &#8358; {formatPrice(product.price)}
//           </p>
//         )}
//       </div>

//       {usage === "trending" && (
//         <Image
//           src={"/assets/hot.png"}
//           className="absolute -top-4 -right-2"
//           alt="icon"
//           height={35}
//           width={35}
//         />
//       )}
//     </Link>
//   );
// };

// export default FeaturedProductCard;

import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { CartContext } from "./AppContext";
import toast from "react-hot-toast";

const FeaturedProductCard = ({ product, link, usage }) => {

  const { addToCart } = useContext(CartContext);

  const handleCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    toast.success("Added to cart!");
  };

  return (
    <Link
      href={link}
      className="animation bg-gray-100/40 relative border border-gray-200/60 shadow-md rounded-lg px-5 py-8"
    >
      <div className="relative h-36 md:h-40 mx-auto">
        {" "}
        {/* Adjusted dimensions for image container */}
        <Image
          src={product.images[0]}
          alt="product"
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col items-center gap-2 mt-4">
        <h1 className="text-sm text-center font-semibold line-clamp-2">
          {product.title}
        </h1>
        {product.discount ? (
          <>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 ">
              <p className="text-sm font-semibold">
                &#8358; {formatPrice(product.discount)}
              </p>
              <p className="text-gray-500 text-xs font-medium line-through">
                &#8358; {formatPrice(product.price)}
              </p>
            </div>
            <p className="text-red-600 text-xs font-normal">
              You save &#8358; {formatPrice(product.price - product.discount)}
            </p>
          </>
        ) : (
          <>
          <p className="text-sm font-semibold whitespace-nowrap">
            &#8358; {formatPrice(product.price)}
          </p>
          <p className="text-red-600 text-xs font-normal">
          No discount offers
        </p>
        </>
        )}
      </div>
      <div className="flex items-center justify-center mt-4">
        <button onClick={handleCart} className="gradient-bg flex items-center gap-2 text-white text-xs font-semibold rounded-lg px-8 py-2.5 cursor-pointer">
          <MdOutlineAddShoppingCart className="text-[16px]" />
          Add To Cart
        </button>
      </div>

      {usage === "trending" && (
        <Image
          src={"/assets/hot.png"}
          className="absolute -top-4 -right-2 animate__animated animate__pulse animate__fast animate__infinite"
          alt="icon"
          height={35}
          width={35}
        />
      )}
    </Link>
  );
};

export default FeaturedProductCard;
