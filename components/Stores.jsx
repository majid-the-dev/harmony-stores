import { IoMdPin } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa6";
import { BsClockFill } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

const Stores = ({ name, address, phone, days, hours }) => {
  return (
    <div>
        <h1 className='text-lg font-semibold'>{name}</h1>
        <p className='flex items-center gap-2 text-sm text-gray-500 mt-5'>
            <span><IoMdPin /></span>
            {address}
        </p>
        <p className='flex items-center gap-2 text-sm text-gray-500 mt-3'>
            <span><MdLocalPhone /></span>
            {phone}
        </p>
        <p className='flex items-center gap-2 text-sm text-gray-500 mt-3'>
            <span><FaRegCalendar /></span>
            {days}
        </p>
        <p className='flex items-center gap-2 text-sm text-gray-500 mt-3'>
            <span><BsClockFill /></span>
            {hours}
        </p>
        <div className="mt-5">
            <Link href={'/'} className="flex items-center gap-2 text-[13px] text-red-600">
                Check Directions
                <span className="text-[18px]"><BsArrowRight /></span>
            </Link>
        </div>
    </div>
  )
}

export default Stores