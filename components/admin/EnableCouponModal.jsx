import { SiTicktick } from "react-icons/si";

const EnableCouponModal = ({ coupon, setIsEnable, onEnable }) => {
  const handleEnable = async (coupon) => {
    await onEnable(coupon._id);
    setIsEnable(false);
  };

  return (
    <>
      <div
        onClick={() => setIsEnable(false)}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-6"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-lg flex flex-col items-center justify-center rounded-lg p-7"
        >
          <p className="bg-green-50 text-green-500 text-3xl rounded-full p-4">
            <SiTicktick />
          </p>
          <h1 className="text-sm font-semibold mt-5">Enable Coupon</h1>
          <p className="w-full max-w-sm text-center text-gray-500 leading-5 mt-2">
            You are about to enable a coupon. Customers will be able to use this
            coupon during checkout.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={() => setIsEnable(false)}
              className="text-gray-500 border border-gray-300 rounded-lg px-6 py-3"
            >
              Cancel
            </button>
            <button
              onClick={handleEnable}
              className="bg-green-500 text-white rounded-lg px-6 py-3"
            >
              Enable
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnableCouponModal;
