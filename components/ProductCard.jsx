import Image from "next/image";
import { BsFillStarFill } from "react-icons/bs";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { GoHeartFill } from "react-icons/go";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useContext } from "react";
import { CartContext } from "./AppContext";
import toast from "react-hot-toast";

const ProductCard = ({ product, link }) => {
  const imageUrl =
    product?.images && product?.images?.length > 0
      ? product.images[0]
      : "/assets/iphone-sample.png";

  const { addToCart } = useContext(CartContext);

  const handleCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    toast.success("Added to cart!");
  };

  return (
    <Link href={link} className="group w-full max-w-56">
      {/* Fixed width for the card */}
      <div className="relative bg-white p-7">
        <div className="relative h-24 md:h-28 mx-auto">
          {" "}
          {/* Adjusted dimensions for image container */}
          <Image
            src={imageUrl}
            alt="product"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        {product?.discount && (
          <div className="absolute top-3 left-0 gradient-bg text-white rounded-r-md px-2.5 py-1.5">
            <p className="text-xs font-medium">
              -
              {Math.round(
                ((product?.price - product?.discount) / product?.price) * 100
              )}
              %
            </p>
          </div>
        )}
        {/* <button className="absolute right-3 bottom-3">
          <GoHeartFill className="text-gray-300 text-xl hover:text-default" />
        </button> */}
        <button
          disabled={product?.availability === "Out of Stock"}
          onClick={handleCart}
          className="absolute bottom-0 left-0 w-full mx-auto flex items-center justify-center gap-2 gradient-bg text-white text-xs font-semibold py-2.5 opacity-0 group-hover:opacity-100 transition-opacity disabled:group-hover:opacity-0 disabled:cursor-not-allowed"
        >
          <MdOutlineAddShoppingCart className="text-[16px]" />
          Add To Cart
        </button>
      </div>
      <div className="flex flex-col items-center mt-6">
        <p className="text-xs md:text-sm text-center font-semibold group-hover:underline underline-offset-1">
          <span className="line-clamp-2">{product?.title}</span>
        </p>
        {product?.discount ? (
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-2">
            <p className="text-red-600 text-xs md:text-sm font-semibold">
              &#8358; {formatPrice(product?.discount)}
            </p>
            <p className="text-gray-400/80 text-xs md:text-sm font-medium line-through">
              &#8358; {formatPrice(product?.price)}
            </p>
          </div>
        ) : (
          <p className="text-red-600 text-xs md:text-[13px] font-semibold mt-2">
            &#8358; {formatPrice(product?.price)}
          </p>
        )}
        {product?.availability === "Out of Stock" && (
          <p className="text-xs text-red-600 font-semibold mt-2 ">
            {product.availability}
          </p>
        )}
        {/* <div className="hidden md:flex items-center gap-2 mt-2">
          <BsFillStarFill className="text-default text-sm" />
          <p className="text-xs text-gray-500 font-normal">5.0 (800 reviews)</p>
        </div> */}
      </div>
      {/* <div className="flex items-center gap-2">
          <button onClick={handleCart} className="gradient-bg text-white w-full flex items-center justify-center gap-2 text-xs font-semibold rounded-lg py-3 mt-5 hover:bg-black/80">
            <MdOutlineAddShoppingCart className="text-[16px]" />
            Add to Cart
          </button>
        </div> */}
    </Link>
  );
};

export default ProductCard;
