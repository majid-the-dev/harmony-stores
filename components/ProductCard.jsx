import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useContext } from "react";
import { CartContext } from "./AppContext";
import toast from "react-hot-toast";
import { Heart, Share2, Eye, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

const ProductCard = ({ product, link }) => {
  const imageUrl =
    product?.images && product?.images?.length > 0
      ? product.images[0]
      : "/assets/iphone-sample.png";

  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  const handleCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    toast.success("Added to cart!");
  };

  return (
    // <Link href={link} className="group w-full max-w-56">
    //   {/* Fixed width for the card */}
    //   <div className="relative bg-white p-7">
    //     <div className="relative h-24 md:h-28 mx-auto">
    //       {" "}
    //       {/* Adjusted dimensions for image container */}
    //       <Image
    //         src={imageUrl}
    //         alt="product"
    //         layout="fill"
    //         objectFit="contain"
    //         className="rounded-lg"
    //       />
    //     </div>
    //     {product?.discount && (
    //       <div className="md:bg-red-100 absolute top-3 left-0 text-red-600 px-2 py-1">
    //         <p className="text-xs font-semibold">
    //           -
    //           {Math.round(
    //             ((product?.price - product?.discount) / product?.price) * 100
    //           )}
    //           %
    //         </p>
    //       </div>
    //     )}
    //     {product.freeGift && (<Image src={'/assets/free-gift-icon.png'} alt="icon" height={50} width={50} className="absolute top-0 right-0" />)}
    //     {/* <button className="absolute right-3 bottom-3">
    //       <GoHeartFill className="text-gray-300 text-xl hover:text-default" />
    //     </button> */}
    //     <button
    //       disabled={product?.availability === "Out of Stock"}
    //       onClick={handleCart}
    //       className="absolute bottom-0 left-0 w-full mx-auto flex items-center justify-center gap-2 gradient-bg text-white text-xs font-semibold py-2.5 opacity-0 group-hover:opacity-100 transition-opacity disabled:group-hover:opacity-0 disabled:cursor-not-allowed"
    //     >
    //       <MdOutlineAddShoppingCart className="text-[16px]" />
    //       Add To Cart
    //     </button>
    //   </div>
    //   <div className="flex flex-col items-center mt-6">
    //     <p className="text-xs md:text-sm text-center font-semibold group-hover:underline underline-offset-1">
    //       <span className="line-clamp-2">{product?.title}</span>
    //     </p>
    //     {product?.discount ? (
    //       <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-2">
    //         <p className="text-red-600 text-xs md:text-sm font-bold">
    //           &#8358; {formatPrice(product?.discount)}
    //         </p>
    //         <p className="text-gray-400/80 text-xs md:text-sm font-medium line-through">
    //           &#8358; {formatPrice(product?.price)}
    //         </p>
    //       </div>
    //     ) : (
    //       <p className="text-red-600 text-xs md:text-[13px] font-bold mt-2">
    //         &#8358; {formatPrice(product?.price)}
    //       </p>
    //     )}
    //     {product?.availability === "Out of Stock" && (
    //       <p className="text-xs text-red-600 font-semibold mt-2 ">
    //         {product.availability}
    //       </p>
    //     )}
    //     {/* <div className="hidden md:flex items-center gap-2 mt-2">
    //       <BsFillStarFill className="text-default text-sm" />
    //       <p className="text-xs text-gray-500 font-normal">5.0 (800 reviews)</p>
    //     </div> */}
    //   </div>
    //   {/* <div className="flex items-center gap-2">
    //       <button onClick={handleCart} className="gradient-bg text-white w-full flex items-center justify-center gap-2 text-xs font-semibold rounded-lg py-3 mt-5 hover:bg-black/80">
    //         <MdOutlineAddShoppingCart className="text-[16px]" />
    //         Add to Cart
    //       </button>
    //     </div> */}
    // </Link>
    <>
      <div className="w-full rounded-lg overflow-hidden bg-white">
        {/* Product Image Container with Fixed Aspect Ratio */}
        <div className="relative aspect-square">
          <Image
            src={imageUrl}
            alt={product?.title}
            fill
            className="object-contain p-4 sm:w-[60%] md:w-[50%] lg:w-[33%] mx-auto"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 30vw"
            loading="lazy"
          />

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-3">
            {/* <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
              <Heart className="w-3.5 h-3.5 text-gray-600" />
            </button> */}
            <button className="p-1.5 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => router.push(link)}
              className="p-1.5 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleCart}
              className="p-1.5 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-white text-center">
          <div className="space-y-4 my-5">
            <h2 className="text-sm font-bold text-gray-900 px-4 line-clamp-2 sm:line-clamp-1">
              {product.title}
            </h2>
            <p className="text-xs text-red-600 font-bold tracking-wider uppercase">
              {product.availability === "Available"
                ? "In Stock"
                : "Out of Stock"}
            </p>
          </div>

          {/* Price and Add to Cart */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-b">
            <div className="flex items-center justify-center sm:border-r border-gray-200 py-2.5 sm:py-4">
              <span className="text-sm font-bold text-gray-900">
                &#8358; {formatPrice(product.price)}
              </span>
            </div>
            <button
              onClick={handleCart}
              className="text-xs font-bold text-gray-900 transition-colors py-4 uppercase hidden sm:block"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
