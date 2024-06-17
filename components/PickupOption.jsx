import Image from "next/image";

const PickupOption = ({ option, setOption }) => {
  return (
    <button
      onClick={() => setOption("pickup")}
      className={`${
        option === "pickup"
          ? "border-default bg-default/10"
          : "border-gray-200 bg-white"
      } animation w-full flex items-center gap-6 border rounded-lg p-7 hover:bg-default/10 hover:border-default`}
    >
      <Image
        src={"/assets/shopping.png"}
        alt="shopping"
        height={60}
        width={60}
      />
      <span className="flex flex-col gap-2">
        <span className="text-left text-sm font-semibold">Pickup</span>
        <span className="text-xs text-gray-500 text-left font-normal leading-5">
          Choose pickup to collect your order at a time that suits you best from
          our designated pickup location. Our in-store team will have everything
          prepared, ensuring a quick and hassle-free experience when you arrive.
        </span>
      </span>
    </button>
  );
};

export default PickupOption;
