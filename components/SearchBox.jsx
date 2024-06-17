import { useContext } from "react";
import { SearchContext } from "./AppContext";
import { FiSearch } from "react-icons/fi";

const SearchBox = () => {
  const { searchBox } = useContext(SearchContext);

  if (!searchBox) return null;

  return (
    <form className="w-full relative animate__animated animate__slideInDown">
      <input
        className="w-full text-sm font-medium border-b border-gray-200 px-12 py-8 outline-none placeholder:text-black placeholder:font-normal"
        placeholder="Search Harmony Stores Here..."
      />
      <FiSearch className="absolute top-1/2 left-6 transform -translate-y-1/2 text-black" />
    </form>
  );
};

export default SearchBox;
