import Image from 'next/image'

const DeliveryOption = ({ option, setOption }) => {
  return (
    <button
    onClick={() => setOption("delivery")}
    className={`${
      option === "delivery"
        ? "border-default bg-default/10"
        : "border-gray-200 bg-white"
    } animation w-full flex items-center gap-6 border rounded-lg p-7 hover:bg-default/10 hover:border-default`}
  >
    <Image
      src={"/assets/delivery.png"}
      alt="delivery"
      height={60}
      width={60}
    />
    <span className="flex flex-col gap-2">
      <span className="text-left text-sm font-semibold">
        Delivery
      </span>
      <span className="text-xs text-gray-500 text-left font-normal leading-5">
        Opt for our delivery service and have your order brought
        directly to your doorstep. Track your order in real-time
        and stay updated on its progress from our store to your
        front door.
      </span>
    </span>
  </button>
  )
}

export default DeliveryOption