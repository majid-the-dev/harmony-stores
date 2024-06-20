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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CartContext } from "@/components/AppContext";
import { PiShareFat } from "react-icons/pi";
import { BiSolidMessageRounded } from "react-icons/bi";

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
    <div className="px-4 md:px-6 py-20 md:py-28">
      <div className="grid grid-cols-2 gap-16">
        <div className="col-span-2 md:col-span-1">
          <div className="h-full w-full grid grid-cols-3 gap-4">
            <div className="col-span-3 md:col-span-1">
              <div className="flex md:flex-col gap-4 w-full overflow-x-scroll md:overflow-y-scroll md:h-full">
                {product?.images?.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-40 md:w-full h-40 bg-gray-50 border border-gray-200 cursor-pointer overflow-hidden"
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
              <div className="relative h-72 md:h-full w-full bg-gray-50 border border-gray-200 overflow-hidden">
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
          <h1 className="text-lg md:text-2xl font-bold max-w-md leading-[29px] md:leading-[35px]">
            {product.title}
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <p className="bg-gray-100 text-[13px] rounded-full px-4 py-1">
              <span className="text-gray-500">Brand:</span>{" "}
              <span className="font-semibold">{product.brand}</span>
            </p>
            <p className="bg-gray-100 text-[13px] rounded-full px-4 py-1">
              <span className="text-gray-500">Status:</span>{" "}
              <span className="font-semibold">{product.availability}</span>
            </p>
          </div>
          {/* <div className="inline-flex items-center gap-6 mt-4 md:mt-6">
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
          </div> */}
          {product.discount ? (
            <>
              <div className="flex items-center gap-4 mt-5 md:mt-8">
                <p className="text-red-600 text-lg md:text-2xl font-bold whitespace-nowrap">
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
            <p className="text-red-600 text-2xl font-bold mt-5 md:mt-8 whitespace-nowrap">
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
              className="animation flex items-center gap-3 bg-black text-white text-xs font-bold px-8 py-3 outline-none hover:bg-black/80 disabled:bg-black/80 disabled:cursor-not-allowed"
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
          <p className="bg-gray-100 px-4 py-2 mt-6 text-[13px] inline-block leading-6">
            <span className="font-semibold">Same Day Delivery:</span> Available
            within Lagos.
            <br />
            <span className="font-semibold">Other States:</span> Estimated
            delivery time is 1-5 days.
          </p>
          <hr className="my-7" />
          {/* <div className="flex items-center gap-3">
            <span className="text-[13px] font-medium inline-flex gap-1">
              <PiShareFat className="text-[18px] mt-1" />
              Share product:
            </span>
            <Link target="_blank" href={"https://www.instagram.com/"}>
              <Image
                src={"/assets/ig-logo.png"}
                height={40}
                width={40}
                alt="logo"
              />
            </Link>
            <Link target="_blank" href={"https://twitter.com/"}>
              <Image
                src={"/assets/x-logo.png"}
                height={25}
                width={25}
                alt="logo"
              />
            </Link>
          </div> */}
          <Link target="_blank" href={"https://wa.me/+2348077286191/"} className="bg-orange-100 text-orange-600 text-[13px] font-medium inline-flex items-center gap-2 rounded-full px-5 py-3"><BiSolidMessageRounded className="text-[22px]" /> Have any inquiry? <span className="underline">Chat with us</span></Link>
          {/* <div className="inline-block bg-gray-50 border border-gray-200 rounded-lg mt-10">
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
          </div> */}
        </div>
      </div>

      <div className="mt-14 md:mt-24">
        <div className="border-b border-gray-200">
          <h1 className="text-[18px] md:text-2xl font-bold border-b-[3px] border-orange-400 inline-block py-3">
            Product Details
          </h1>
        </div>

        <div className="mt-10">
          <p className="text-[13px] leading-6 mt-3">{product.description}</p>
          <hr className="my-10" />
          <Table className="border border-gray-200">
            <TableBody>
              {product.properties.map((property, index) => (
                <TableRow
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-gray-100 hover:bg-gray-100"
                      : "bg-white hover:bg-white"
                  }
                >
                  <TableCell className="text-[13px] font-semibold capitalize">
                    {property.name}
                  </TableCell>
                  <TableCell className="text-[13px]">
                    {property.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="border-b border-gray-200 mt-10">
          <h1 className="text-[18px] md:text-2xl font-bold border-b-[3px] border-orange-400 inline-block py-3">
            Important Information
          </h1>
        </div>

        <p className="text-[13px] leading-6 mt-10">
          Please be advised that delivery dates are estimates provided to
          Harmony Stores NG from the couriers we have partnered with. Deliveries
          to rural locations may experience delays which is beyond our control.
          It is the buyers responsibility to be informed if their location falls
          under rural. Delivery dates may vary depending on the delivery
          destination and the delivery method selected. Please note that for any
          reason due to circumstances beyond our control delivery may be delayed
          (inclement weather, lost or stolen packages etc.)
          <br />
          <br />
          Delivery of your order is subject to the availability of inventory
          from our Distribution Centre. Orders placed for in-stock products will
          typically be processed and shipped within one business day from our
          distribution centre and are included in the transit times. Orders are
          processed and shipped Monday through Saturday. We do not process or
          ship orders on public holidays.
        </p>
      </div>
    </div>
  );
};

export default Page;
