"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const SearchModal = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button onClick={() => setModal(true)}>
        <FiSearch className="text-xl md:text-[22px]" />
      </button>

      {modal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-8 animate__animated animate__pulse">
          <div className="w-full max-w-xl">
            <form className="w-full relative">
              <input
                type="text"
                placeholder="Search product here..."
                className="w-full bg-white text-sm font-medium rounded-lg px-10 py-3 md:py-5 outline-none placeholder:text-gray-400 placeholder:font-normal"
              />
              <FiSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
              <button onClick={() => setModal(false)} className="absolute -top-9 -right-4 text-white text-xl md:text-2xl rounded">
                <IoClose />
              </button>
            </form>
          </div>
          {/* <div onClick={(e) => e.stopPropagation()} className="bg-white w-full max-w-3xl rounded-lg p-7 h-full max-h-[80vh] overflow-y-scroll"></div> */}
        </div>
      )}
    </>
  );
};

export default SearchModal;
