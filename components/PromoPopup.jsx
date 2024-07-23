import { useState, useEffect } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const PromoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenModal");
    if (!hasSeenModal) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenModal", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] px-6">
      <div className="relative">
        <button
          onClick={handleClose}
          className="absolute -top-10 right-0 md:-right-10 text-lg text-white border border-white rounded-full p-1"
        >
          <IoClose />
        </button>
        <Image
          src={"/assets/promo-banner.jpeg"}
          alt="banner"
          height={500}
          width={500}
        />
      </div>
    </div>
  );
};

export default PromoPopup;
