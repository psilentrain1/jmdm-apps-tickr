import { MdSearch } from "react-icons/md";
import { useStore } from "../hooks/useStore";

export function SearchBar() {
  const searchInput = useStore((state) => state.searchInput);
  const setSearchInput = useStore((state) => state.setSearchInput);

  return (
    <>
      <form className="flex flex-row items-center justify-center" action="">
        <input
          className="h-7 w-96 rounded-2xl border-0 bg-gray-100 px-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="text"
          name="searchInput"
          id="searchInput"
          placeholder="Search for a stock symbol or company name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="-translate-x-8 cursor-pointer text-2xl text-gray-400 hover:text-gray-900">
          <MdSearch />
        </div>
      </form>
    </>
  );
}
