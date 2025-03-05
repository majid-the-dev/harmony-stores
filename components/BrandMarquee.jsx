import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const brandLogos = [
  { src: "/assets/infinix-logo.png", alt: "Infinix", href: "/" },
  { src: "/assets/itel-logo.png", alt: "Itel", href: "/" },
  { src: "/assets/apple-logo.png", alt: "Apple", href: "/" },
  { src: "/assets/samsung-logo.png", alt: "Samsung", href: "/" },
  { src: "/assets/redmi-logo.png", alt: "Redmi", href: "/" },
  { src: "/assets/tecno-logo.png", alt: "Tecno", href: "/" },
  { src: "/assets/hp-logo.png", alt: "HP", href: "/" },
  { src: "/assets/acer-logo.png", alt: "Acer", href: "/" },
  { src: "/assets/lenovo-logo.png", alt: "Lenovo", href: "/" },
  { src: "/assets/transcend-logo.png", alt: "Transcend", href: "/" },
  { src: "/assets/logitech-logo.png", alt: "Logitech", href: "/" },
  { src: "/assets/asus.png", alt: "Asus", href: "/" },
  { src: "/assets/sony.png", alt: "Sony", href: "/" },
  { src: "/assets/nokia.png", alt: "Nokia", href: "/" },
  { src: "/assets/fitbit.png", alt: "Fitbit", href: "/" },
  { src: "/assets/baseus.avif", alt: "Baseus", href: "/" },
  { src: "/assets/dell.png", alt: "Dell", href: "/" },
  { src: "/assets/beats.png", alt: "Beats", href: "/" },
  { src: "/assets/jbl-logo.png", alt: "JBL", href: "/" },
  { src: "/assets/kardon-logo.png", alt: "Harman Kardon", href: "/" },
];

const BrandLogo = ({ src, alt, href }) => (
  <Link href={href}>
    <div className="relative h-20 w-20 md:h-23 md:w-23 mx-4 md:mx-10">
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        sizes="(max-width: 768px) 80px, 112px"
        className="object-contain"
      />
    </div>
  </Link>
);

const BrandMarquee = () => {
  return (
    <div className="bg-gray-100/90 py-10 mt-20">
      <Marquee className="overflow-hidden" pauseOnHover={true} speed={40}>
        {brandLogos.map((logo, index) => (
          <BrandLogo key={index} {...logo} />
        ))}
      </Marquee>
    </div>
  );
};

export default BrandMarquee;
