import Marquee from "react-fast-marquee";

const ScrollingText = () => {
  return (
    <div className="bg-default py-6">
        <Marquee>
            <h1 className="text-black text-2xl font-semibold px-12">Exclusive deals</h1>
            <h1 className="text-black text-2xl font-semibold px-12">Nationwide Delivery</h1>
            <h1 className="text-black text-2xl font-semibold px-12">Warranty</h1>
            <h1 className="text-black text-2xl font-semibold px-12">Headphones</h1>
        </Marquee>
    </div>
  )
}

export default ScrollingText