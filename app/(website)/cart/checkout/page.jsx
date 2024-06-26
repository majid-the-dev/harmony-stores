"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { BiSolidTrash } from "react-icons/bi";

import { storesData } from "@/public/data";
import { CartContext } from "@/components/AppContext";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import toast from "react-hot-toast";
import { states } from "@/public/data";
import CheckoutDisclaimer from "@/components/CheckoutDisclaimer";
import CheckoutUnauthenticated from "@/components/CheckoutUnauthenticated";
import DeliveryInformation from "@/components/DeliveryInformation";
import PickupSchedule from "@/components/PickupSchedule";
import { PaystackButton } from "react-paystack";
import DeliveryOption from "@/components/DeliveryOption";
import PickupOption from "@/components/PickupOption";
import LoadingScreen from "@/components/LoadingScreen";
// import { PaystackButton } from "react-paystack";

const generateOrderId = () => {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `HNY-${randomDigits}`;
};

const Page = () => {
  const publicKey = "pk_live_6f45e5455a5f087d4dcd5c15dd07fe5c7de365dd";

  const router = useRouter();
  const { data: session, status } = useSession();
  const { cartProducts, removeCartProduct, clearCart } =
    useContext(CartContext);
  const [quantities, setQuantities] = useState({});
  const [option, setOption] = useState("delivery");

  const [code, setCode] = useState("");
  const [validateCoupon, setValidateCoupon] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  const [validCoupon, setValidCoupon] = useState(null);
  const [couponAppliedMessage, setCouponAppliedMessage] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [pickupSchedule, setPickupSchedule] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setFirstName(session.user.firstName || "");
      setLastName(session.user.lastName || "");
      setUserEmail(session.user.email || "");
      setPhoneNumber(session.user.phone || "");
      setStreetAddress(session.user.streetAddress || "");
      setCity(session.user.city || "");
      setState(session.user.state || "");
    }
  }, [status, session]);

  useEffect(() => {
    // Initialize quantities state based on cart products
    const initialQuantities = {};
    cartProducts.forEach((product) => {
      initialQuantities[product._id] = 1;
    });
    setQuantities(initialQuantities);
  }, [cartProducts]);

  useEffect(() => {
    validateForm();
    calculateDeliveryFee();
  }, [
    firstName,
    lastName,
    phoneNumber,
    userEmail,
    streetAddress,
    city,
    state,
    pickupSchedule,
    pickupLocation,
    option,
    cartProducts,
  ]);

  const calculateDeliveryFee = () => {
    if (option === "pickup") {
      setDeliveryFee(0);
      return;
    }

    let fee = 0;
    const stateData = states.find(
      (s) => s.name.toLowerCase() === state.toLowerCase()
    );

    if (!stateData) {
      setErrorMessage("Invalid state selected for delivery.");
      return;
    }

    let hasHeavy = cartProducts.some(
      (product) => product.weightClass === "heavy"
    );

    fee = hasHeavy ? stateData.heavy : stateData.light;

    setDeliveryFee(fee);
  };

  const validateForm = () => {
    if (option === "delivery") {
      if (
        !firstName ||
        !lastName ||
        !phoneNumber ||
        !streetAddress ||
        !city ||
        !state
      ) {
        setErrorMessage(
          "Kindly fill all delivery information to proceed with order confirmation."
        );
        return false;
      }
    } else if (option === "pickup") {
      if (!pickupSchedule || !pickupLocation) {
        setErrorMessage(
          "Kindly select a pickup schedule and location to proceed with order confirmation."
        );
        return false;
      }
    }
    setErrorMessage("");
    return true;
  };

  const handleQuantityChange = (productId, action) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (action === "increase") {
        newQuantities[productId] += 1;
      } else if (action === "decrease" && newQuantities[productId] > 1) {
        newQuantities[productId] -= 1;
      }
      return newQuantities;
    });
  };

  const calculateTotalPrice = () => {
    return cartProducts.reduce((total, product) => {
      const quantity = quantities[product._id] || 1;
      const price = product.discount ? product.discount : product.price;
      return total + price * quantity;
    }, 0);
  };

  const handleCouponValidation = async (e) => {
    e.preventDefault();
    setValidateCoupon(true);
    setCouponMessage("");
    setDiscountValue(0);

    try {
      const response = await fetch("/api/check-coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok) {
        setCouponMessage(data.message);
      } else {
        setValidCoupon(data.coupon);
        const coupon = data.coupon;
        const subtotal = calculateTotalPrice();

        if (coupon.type === "percentage") {
          const discount = (coupon.percentage / 100) * subtotal;
          setDiscountValue(discount);
          setCouponAppliedMessage(true);
          // setCouponMessage("Coupon applied successfully!");
        } else if (coupon.type === "amount") {
          const discount = coupon.amount;
          setDiscountValue(discount);
          setCouponAppliedMessage(true);
          // setCouponMessage("Coupon applied successfully!");
        }
      }
    } catch (error) {
      setCouponMessage("An error occurred. Please try again.");
    }

    setValidateCoupon(false);
  };

  const handleRemoveCoupon = () => {
    setValidCoupon(null);
    setDiscountValue(0);
    setCode("");
  };

  const totalPrice = calculateTotalPrice();
  const totalAfterDiscount = totalPrice - discountValue;
  const grandTotal = totalAfterDiscount + deliveryFee;

  const handleConfirmOrder = async (reference) => {
    // if (!validateForm()) return;

    const orderId = generateOrderId();
    const userId = session.user.id;
    const customerName = `${firstName} ${lastName}`;
    const email = userEmail;
    const phone = phoneNumber;
    const address = `${streetAddress}, ${city}, ${state}`;
    const products = cartProducts.map((product) => ({
      id: product._id,
      title: product.title,
      price: product.discount ? product.discount : product.price,
      quantity: quantities[product._id] || 1,
    }));
    const totalPrice = grandTotal;
    const orderType = option;
    const orderData = {
      orderId,
      userId,
      customerName,
      email,
      phone,
      address,
      products,
      deliveryFee,
      discountValue,
      totalPrice,
      orderType,
      pickupSchedule,
      pickupLocation,
      additionalInfo,
    };

    console.log(orderData);

    try {
      const verificationResponse = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reference }), // replace with your transaction reference variable
      });

      if (!verificationResponse.ok) {
        toast.error("Transaction verification failed!");
        return;
      }

      const verificationData = await verificationResponse.json();

      if (verificationData.status !== "success") {
        toast.error("Transaction verification failed!");
        return;
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // Order successfully submitted
        toast.success("Order confirmed successfully!");
        clearCart();
        router.push("/profile/orders/"); // Redirect to order success page
      } else {
        // Handle error
        toast.error("Something went wrong!");
        console.error("Failed to submit order");
      }
    } catch (error) {
      console.error("An error occurred while submitting the order", error);
      toast.error("Something went wrong!");
    }
  };

  const componentProps = {
    email: userEmail,
    amount: parseInt(grandTotal),
    metadata: {
      name: `${firstName} ${lastName}`,
      phone: phoneNumber,
    },
    publicKey,
    text: "Confirm Order",
    onSuccess: (reference) => handleConfirmOrder(reference),
  };

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status === "unauthenticated") {
    return <CheckoutUnauthenticated />;
  }

  return (
    <div>
      {cartProducts.length === 0 && (
        <div className="px-16 py-40">
          <div className="flex flex-col items-center justify-center">
            <Image
              src={"/assets/shopping-bag.png"}
              height={100}
              width={100}
              alt="icon"
            />
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
          <h1 className="text-2xl font-semibold">Checkout Order</h1>

          <div className="grid grid-cols-5 gap-8 mt-12">
            <div className="col-span-5 lg:col-span-2">
              <div className="flex flex-col gap-5">
                <DeliveryOption option={option} setOption={setOption} />
                <PickupOption option={option} setOption={setOption} />
              </div>

              {option === "delivery" && (
                <DeliveryInformation
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  email={userEmail}
                  setEmail={setUserEmail}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  streetAddress={streetAddress}
                  setStreetAddress={setStreetAddress}
                  city={city}
                  setCity={setCity}
                  state={state}
                  setState={setState}
                  additionalInfo={additionalInfo}
                  setAdditionalInfo={setAdditionalInfo}
                />
              )}

              {option === "pickup" && (
                <PickupSchedule
                  pickupSchedule={pickupSchedule}
                  setPickupSchedule={setPickupSchedule}
                  setPickupLocation={setPickupLocation}
                />
              )}
            </div>

            <div className="col-span-5 lg:col-span-3">
              <div className="bg-white border border-gray-200 rounded-lg p-7">
                {/* Order Summary */}
                <div>
                  <h1 className="text-sm font-semibold">Order Summary</h1>
                  <div className="flex flex-col mt-6">
                    {cartProducts.map((product, index) => (
                      <div
                        key={product._id}
                        className="flex gap-3 border-b py-8"
                      >
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
                          <p className="text-sm font-semibold">
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
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-gray-500">Quantity:</p>
                              <div className="inline-flex gap-4 bg-gray-100 border border-gray-200 rounded-full px-4 py-1">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      product._id,
                                      "decrease"
                                    )
                                  }
                                >
                                  <FaMinus className="text-xs text-gray-400 hover:text-black" />
                                </button>
                                <span className="text-sm font-semibold">
                                  {quantities[product._id] || 1}
                                </span>
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      product._id,
                                      "increase"
                                    )
                                  }
                                  className="animation"
                                >
                                  <FaPlus className="text-xs text-gray-400 hover:text-black" />
                                </button>
                              </div>
                            </div>
                            <button
                              className="animation bg-red-100 text-red-600 text-sm border border-red-200 rounded-full p-2"
                              onClick={() => removeCartProduct(index)}
                            >
                              <BiSolidTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="border-b pb-14">
                  <h1 className="flex items-center gap-2.5 text-sm font-semibold mt-10">
                    Coupon Code
                    <Image
                      src={"/assets/discount.png"}
                      height={20}
                      width={20}
                      alt="icon"
                    />
                  </h1>
                  <p className="text-xs text-gray-500 font-normal leading-5 mt-1.5">
                    Enter your coupon code in the box below to receive a
                    discount on your order.
                  </p>
                  <form
                    onSubmit={handleCouponValidation}
                    className="flex items-center gap-3 mt-5"
                  >
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="CODE"
                      className="bg-gray-100 text-sm font-semibold border border-gray-200 rounded-lg px-3 py-3 outline-none placeholder:text-gray-400"
                    />
                    <button
                      type="submit"
                      disabled={validateCoupon}
                      className="animation bg-black text-white text-sm font-medium rounded-lg px-7 py-3 hover:bg-black/80 disabled:bg-black/80 disabled:cursor-not-allowed"
                    >
                      {validateCoupon ? (
                        <LoaderIcon
                          size={17}
                          className="animate-spin text-white"
                        />
                      ) : (
                        <span>Redeem</span>
                      )}
                    </button>
                  </form>
                  {validCoupon && couponAppliedMessage && (
                    <div className="flex items-center gap-4 mt-6">
                      <div className="inline-flex items-center gap-1 bg-default/10 text-gray-500 text-xs border border-default rounded-lg px-4 py-2">
                        <span className="text-black text-sm font-semibold">
                          {validCoupon.name}
                        </span>{" "}
                        coupon applied successfully!
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="flex items-center justify-center text-red-600 text-xs font-medium"
                      >
                        {/* <IoClose className="text-red-600" /> */}
                        Remove
                      </button>
                    </div>
                  )}
                  {couponMessage && (
                    <p className="text-red-600 text-xs font-medium mt-6">
                      {couponMessage}
                    </p>
                  )}
                </div>

                {/* Payment Summary */}
                <div>
                  <h1 className="text-sm font-semibold mt-10 mb-6">
                    Payment Summary
                  </h1>
                  <div className="flex flex-col gap-7">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-xs">Subtotal</p>
                      <p className="text-gray-500 text-sm font-semibold">
                        &#8358; {formatPrice(calculateTotalPrice())}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-red-600 text-xs">Discount</p>
                      <p className="text-red-600 text-sm font-semibold">
                        - &#8358; {formatPrice(discountValue)}{" "}
                        {/* Update this value if you have discount logic */}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-xs">Delivery</p>
                      <p className="text-gray-500 text-sm font-semibold">
                        &#8358; {formatPrice(deliveryFee)}
                        {/* Update this value if you have delivery charge logic */}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Total</p>
                      <p className="text-sm font-semibold">
                        &#8358; {formatPrice(grandTotal)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <CheckoutDisclaimer />

                {/* <button
                  onClick={handleConfirmOrder}
                  className="animation bg-black text-white text-sm font-medium rounded-lg px-7 py-3 mt-7 hover:bg-black/80"
                >
                  Confirm Order
                </button> */}

                <PaystackButton
                  className="animation bg-black text-white text-sm font-medium rounded-lg px-7 py-3 mt-7 hover:bg-black/80"
                  {...componentProps}
                />

                {errorMessage && (
                  <p className="bg-red-100 text-red-600 text-xs leading-5 rounded-lg px-4 py-2 mt-5">
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
