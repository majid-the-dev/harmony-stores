import { AiOutlineStop } from "react-icons/ai";

const DisableCouponModal = ({ coupon, setIsDisable, onDisable }) => {

    const handleDisable = async (coupon) => {
        await onDisable(coupon._id);
        setIsDisable(false);
    };

  return (
    <>
      <div
        onClick={() => setIsDisable(false)}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-6"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-lg flex flex-col items-center justify-center rounded-lg p-7"
        >
          <p className="bg-red-50 text-red-500 text-3xl rounded-full p-4">
            <AiOutlineStop />
          </p>
          <h1 className="text-sm font-semibold mt-5">Disable Coupon</h1>
          <p className="w-full max-w-sm text-center text-gray-500 leading-5 mt-2">
            You are about to disable a coupon. Customers will not be able to use this coupon during checkout.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={() => setIsDisable(false)}
              className="text-gray-500 border border-gray-300 rounded-lg px-6 py-3"
            >
              Cancel
            </button>
            <button
                onClick={handleDisable}
              className="bg-red-500 text-white rounded-lg px-6 py-3"
            >
              Disable
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisableCouponModal;
