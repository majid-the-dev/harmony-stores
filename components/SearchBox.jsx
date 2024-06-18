import { FiSearch } from "react-icons/fi";

const SearchBox = () => {
  return (
    <form className="relative mx-4 md:mx-6 mt-4">
      <input
        className="w-full text-xs font-medium border bg-gray-100 border-gray-200 rounded px-8 md:px-11 py-4 md:py-5 shadow outline-none placeholder:text-[11px] md:placeholder:text-xs placeholder:text-gray-500 placeholder:font-medium"
        placeholder="Search Harmony Stores Here..."
      />
      <FiSearch className="absolute top-1/2 left-3 md:left-6 transform -translate-y-1/2 text-gray-500 font-medium text-[12.5px]" />
    </form>
  );
};

export default SearchBox;
