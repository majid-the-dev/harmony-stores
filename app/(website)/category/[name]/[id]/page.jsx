"use client";

import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaStore } from "react-icons/fa6";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CartContext } from "@/components/AppContext";

const Page = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageDisplay, setImageDisplay] = useState(null);
  const [view, setView] = useState("specifications");

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/product-page/${id}`);
          const productData = await response.json();
          setProduct(productData);
          setImageDisplay(productData.images[0]);
        } catch (error) {
          toast.error("Something went wrong!");
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <LoaderIcon size={40} className="animate-spin text-default" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <LoaderIcon size={40} className="animate-spin text-default" />
      </div>
    );
  }

  return (
    <div className="px-6 py-28">
      <div className="grid grid-cols-2 gap-16">
        <div className="col-span-2 md:col-span-1">
          <div className="h-full w-full grid grid-cols-3 gap-4">
            <div className="col-span-3 md:col-span-1">
              <div className="flex md:flex-col gap-4 w-full overflow-x-scroll md:overflow-y-scroll md:h-full">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-40 md:w-full h-40 bg-gray-50 border border-gray-200 rounded-2xl cursor-pointer overflow-hidden"
                    onClick={() => setImageDisplay(image)}
                  >
                    <Image
                      src={image}
                      alt="product"
                      layout="fill"
                      objectFit="contain"
                      objectPosition="center"
                      className="p-6" // Add padding around the image
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-3 md:col-span-2 -order-1 md:order-1">
              <div className="relative h-72 md:h-full w-full bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
                <Image
                  src={imageDisplay}
                  alt="product"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                  className="p-6 md:p-10" // Add padding around the image
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h1 className="text-lg md:text-2xl font-semibold max-w-md leading-[29px] md:leading-[35px]">
            {product.title}
          </h1>
          <div className="inline-flex items-center gap-6 mt-4 md:mt-6">
            <p className="text-xs">
              <span className="text-gray-500 font-light">Brand:</span>
              &nbsp;&nbsp;
              <span className="font-semibold">{product.brand}</span>
            </p>
            {product.availability === "Out of Stock" ? (
              <p className="flex items-center gap-1.5 bg-red-600 text-xs text-white font-semibold rounded-lg px-3 py-1">
                <span className="">{product.availability}</span>
              </p>
            ) : (
              <p className="flex items-center gap-1.5 bg-black text-xs text-white font-semibold rounded-lg px-3 py-1">
                In Stock
              </p>
            )}
          </div>
          {product.discount ? (
            <>
              <div className="flex items-center gap-4 mt-5 md:mt-8">
                <p className="text-red-600 text-lg md:text-2xl font-semibold whitespace-nowrap">
                  &#8358; {formatPrice(product.discount)}
                </p>
                <p className="text-gray-500 text-sm line-through whitespace-nowrap">
                  &#8358; {formatPrice(product.price)}
                </p>
              </div>
              <p className="text-red-600 text-xs font-medium mt-2">
                You save{" "}
                {Math.round(
                  ((product?.price - product?.discount) / product?.price) * 100
                )}
                % when you purchase this item.
              </p>
            </>
          ) : (
            <p className="text-red-600 text-2xl font-semibold mt-5 md:mt-8 whitespace-nowrap">
              &#8358; {formatPrice(product.price)}
            </p>
          )}
          <div className="flex items-center gap-6 mt-8">
            <button
              disabled={product.availability === "Out of Stock"}
              onClick={() => {
                addToCart(product);
                toast.success("Added to cart!");
              }}
              className="flex items-center gap-3 gradient-bg text-white text-xs font-semibold rounded-lg px-8 py-3 md:py-4 outline-none disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <MdOutlineAddShoppingCart className="text-[17px]" />
              ADD TO CART
            </button>
          </div>
          <div className="mt-8">
            <Link
              href={"/stores"}
              className="flex items-center gap-1 text-xs font-medium text-red-600 underline underline-offset-4"
            >
              <FaStore />
              Check pickup locations here
            </Link>
          </div>
          <div className="inline-block bg-gray-50 border border-gray-200 rounded-lg mt-10">
            <div className="flex items-center gap-4 border-b border-gray-200 p-5">
              <Image
                src={"/assets/delivery.png"}
                alt="delivery"
                height={25}
                width={25}
              />
              <div className="flex flex-col gap-1">
                <p className="text-[13px] font-semibold">Doorstep Delivery</p>
                <p className="text-gray-500 text-xs">
                  Availability may differ depending on the location.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5">
              <Image
                src={"/assets/shopping.png"}
                alt="delivery"
                height={25}
                width={25}
              />
              <div className="flex flex-col gap-1">
                <p className="text-[13px] font-semibold">Return Policy</p>
                <p className="text-gray-500 text-xs">
                  For details about our return policy, contact us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block mt-24">
        <div className="flex items-center border-b border-gray-300">
          <button
            onClick={() => setView("specifications")}
            className={`${
              view === "specifications"
                ? "gradient-bg text-white font-semibold"
                : "text-black font-medium"
            } animation text-sm border-t border-l border-r border-gray-300 rounded-tl-lg px-8 py-4 hover:gradient-bg`}
          >
            Specifications
          </button>
          <button
            onClick={() => setView("delivery")}
            className={`${
              view === "delivery"
                ? "gradient-bg text-white font-semibold"
                : "text-black font-medium"
            } animation text-sm border-t border-r border-gray-300 rounded-tr-lg px-8 py-4 hover:gradient-bg`}
          >
            Delivery & Returns
          </button>
        </div>
        <div className="mt-10">
          {view === "specifications" && (
            <>
              <p className="text-sm font-semibold">
                {product.title} specifications
              </p>
              <p className="text-xs leading-6 mt-2">{product.description}</p>
              <div className="mt-6">
                {product.properties.map((property, index) => (
                  <div key={index} className="flex items-center gap-5 py-3">
                    <span className="text-xs font-semibold uppercase inline-grid">
                      {property.name}:
                    </span>
                    <span className="text-gray-500 text-xs capitalize inline-grid">
                      {property.description}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {view === "delivery" && (
            <>
              <p className="text-sm font-semibold">DELIVERY DISCLAIMER</p>
              <p className="text-gray-500 text-xs font-normal leading-5 mt-3">
                Please be advised that delivery dates are estimates provided to
                Harmony Stores NG from the couriers we have partnered with.
                Deliveries to rural locations may experience delays which is
                beyond our control. It is the buyers responsibility to be
                informed if their location falls under rural. Delivery dates may
                vary depending on the delivery destination and the delivery
                method selected. Please note that for any reason due to
                circumstances beyond our control delivery may be delayed
                (inclement weather, lost or stolen packages etc.)
                <br />
                <br />
                Delivery of your order is subject to the availability of
                inventory from our Distribution Centre. Orders placed for
                in-stock products will typically be processed and shipped within
                one business day from our distribution centre and are included
                in the transit times. Orders are processed and shipped Monday
                through Saturday. We do not process or ship orders on public
                holidays.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="block md:hidden mt-16">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b border-gray-300/70">
            <AccordionTrigger className="text-[15px] font-semibold">
              Specifications
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-500 text-xs leading-6 mt-4">
                {product.description}
              </p>
              <div className="mt-6">
                {product.properties.map((property, index) => (
                  <div key={index} className="flex items-center gap-5 py-3">
                    <span className="text-xs font-semibold inline-grid uppercase">
                      {property.name}:
                    </span>
                    <span className="text-gray-500 text-xs capitalize inline-grid">
                      {property.description}
                    </span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b border-gray-300/70">
            <AccordionTrigger className="text-[15px] font-semibold">
              Delivery & Returns
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-500 text-xs leading-6 mt-4">
                Please be advised that delivery dates are estimates provided to
                Harmony Stores NG from the couriers we have partnered with.
                Deliveries to rural locations may experience delays which is
                beyond our control. It is the buyers responsibility to be
                informed if their location falls under rural. Delivery dates may
                vary depending on the delivery destination and the delivery
                method selected. Please note that for any reason due to
                circumstances beyond our control delivery may be delayed
                (inclement weather, lost or stolen packages etc.)
                <br />
                <br />
                Delivery of your order is subject to the availability of
                inventory from our Distribution Centre. Orders placed for
                in-stock products will typically be processed and shipped within
                one business day from our distribution centre and are included
                in the transit times. Orders are processed and shipped Monday
                through Saturday. We do not process or ship orders on public
                holidays.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Page;
