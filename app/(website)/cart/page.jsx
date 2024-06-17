"use client";

import { CartContext } from "@/components/AppContext";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils";
import { FaMinus, FaPlus } from "react-icons/fa";
import { BiSolidTrash, BiSolidSad } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import { AiFillShop } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import Link from "next/link";

const Page = () => {
  const { cartProducts, removeCartProduct, clearCart } =
    useContext(CartContext);

  const [anyOutOfStock, setAnyOutOfStock] = useState(false);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    // Initialize quantities with 1 for each product
    const initialQuantities = cartProducts.reduce((acc, product) => {
      acc[product._id] = 1;
      return acc;
    }, {});
    setQuantities(initialQuantities);
    setAnyOutOfStock(
      cartProducts.some((product) => product.availability === "Out of Stock")
    );
  }, [cartProducts]);

  const reduceQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]:
        prevQuantities[productId] > 1 ? prevQuantities[productId] - 1 : 1,
    }));
  };

  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const calculateTotalPrice = () => {
    return cartProducts.reduce((total, product) => {
      const price = product.discount ? product.discount : product.price;
      return total + price * quantities[product._id];
    }, 0);
  };

  return (
    <div>
      {cartProducts.length === 0 && (
        <div className="px-16 py-40">
          <div className="flex flex-col items-center justify-center">
            {/* <BiSolidSad className="text-default text-4xl" /> */}
            <Image src={'/assets/shopping-bag.png'} height={100} width={100} alt="icon" />
            <p className="text-xl text-center font-semibold mt-5">
              Ooops! Shopping Bag is Empty
            </p>
            <p className="text-xs text-gray-500 text-center font-light leading-5 mt-2">
              Before proceeding to checkout, you must add some products to your
              shopping bag!
            </p>
          </div>
        </div>
      )}
      {cartProducts.length > 0 && (
        <div className="px-6 py-14">
          <h1 className="text-xl md:text-2xl font-semibold">Shopping Cart</h1>

          <div className="mt-12">
            {anyOutOfStock && (
              <p className="inline-flex items-center gap-2 bg-red-100 text-red-600 text-xs font-medium rounded-lg px-4 py-2">
                <BsInfoCircle />
                Some products in your cart are out of stock
              </p>
            )}
            <div className="grid grid-cols-5 gap-8 mt-8">
              <div className="col-span-5 lg:col-span-3">
                <div className="bg-white border border-gray-200 rounded-lg p-7">
                  <div className="flex flex-col">
                    {cartProducts.map((product, index) => (
                      <div
                        key={product._id}
                        className={`flex flex-col md:flex-row justify-between gap-7 py-12 ${
                          index !== cartProducts.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className="relative w-20 h-20">
                            <Image
                              src={product.images[0]}
                              alt="product"
                              layout="fill"
                              objectFit="contain"
                              className="rounded-lg"
                            />
                          </div>
                          <div className="flex flex-col gap-3">
                            <p className="text-sm font-semibold line-clamp-1">
                              {product.title}
                            </p>
                            {product.discount && (
                              <div className="flex items-center gap-3">
                                <p className="bg-red-100 text-xs text-red-600 font-medium rounded-lg px-3 py-1">
                                  -
                                  {Math.round(
                                    ((product.price - product.discount) /
                                      product.price) *
                                      100
                                  )}
                                  %
                                </p>
                                <p className="text-xs text-gray-400 font-medium line-through">
                                  &#8358; {formatPrice(product.price)}
                                </p>
                              </div>
                            )}
                            <p className="text-sm font-semibold">
                              &#8358;{" "}
                              {formatPrice(
                                product.discount
                                  ? product.discount
                                  : product.price
                              )}
                            </p>
                            {product.availability === "Out of Stock" && (
                              <div className="inline-block">
                                <p className="inline-flex items-center gap-2 bg-red-100 text-red-600 text-xs font-medium rounded-lg px-3 py-1.5">
                                  <BsInfoCircle className="text-[12px]" />
                                  Out of stock
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-gray-500">Quantity:</p>
                            <div className="inline-flex gap-4 bg-gray-100 border border-gray-200 rounded-full px-4 py-1">
                              <button
                                onClick={() => reduceQuantity(product._id)}
                                className="animation"
                              >
                                <FaMinus className="text-xs text-gray-400 hover:text-black" />
                              </button>
                              <span className="text-sm font-semibold">
                                {quantities[product._id]}
                              </span>
                              <button
                                onClick={() => increaseQuantity(product._id)}
                                className="animation"
                              >
                                <FaPlus className="text-xs text-gray-400 hover:text-black" />
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeCartProduct(index)}
                            className="flex items-center gap-2 text-red-600 text-xs font-medium"
                          >
                            <FiTrash2 />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 lg:mt-6">
                  <Link
                    href={"/"}
                    className="animation flex items-center gap-2 bg-black text-default text-xs font-medium rounded-lg px-5 py-3 mt-5 hover:bg-black/80"
                  >
                    <AiFillShop />
                    Return to Shop
                  </Link>
                  <button
                    onClick={() => clearCart()}
                    className="animation flex items-center gap-2 bg-red-600 text-white text-xs font-medium rounded-lg px-5 py-3 mt-5 hover:bg-red-600/80"
                  >
                    <BiSolidTrash />
                    Clear Cart
                  </button>
                </div>
              </div>

              <div className="col-span-5 lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-7">
                  <h1 className="text-sm font-semibold">Payment Summary</h1>
                  <div className="flex flex-col gap-5 mt-7">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-xs">Item Quantity</p>
                      <p className="text-gray-500 text-sm font-semibold">
                        {cartProducts.reduce(
                          (acc, product) => acc + quantities[product._id],
                          0
                        )}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Order Total</p>
                      <p className="text-sm font-semibold">
                        &#8358; {formatPrice(calculateTotalPrice())}
                      </p>
                    </div>
                  </div>
                  <div className="mt-12">
                    <Link
                      href={"/cart/checkout"}
                      className={`animation inline-flex items-center gap-2 bg-black text-default text-xs font-medium rounded-lg px-5 py-3 hover:bg-black/80 ${
                        anyOutOfStock
                          ? "disabled cursor-not-allowed opacity-50"
                          : ""
                      }`}
                    >
                      <IoBagCheckOutline className="text-[14px]" />
                      Proceed To Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
