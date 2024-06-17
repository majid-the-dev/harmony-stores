import { BsThreeDots } from "react-icons/bs";

const LatestOrders = () => {
  return (
    <div className='w-full bg-gray-50/50 border border-gray-200/55 rounded-lg'>
        <div className="flex items-center justify-between px-4 py-4">
          <p className="text-xs font-medium">
            Customer Orders
          </p>
          <button>
            <BsThreeDots />
          </button>
        </div>
    </div>
  )
}

export default LatestOrders