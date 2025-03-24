import log from "electron-log/renderer";
import { useNavigate } from "react-router";
import { MdSearch } from "react-icons/md";
import { useStore } from "../hooks/useStore";

const searchLog = log.scope("SearchBar");

export function SearchBar() {
  const searchInput = useStore((state) => state.searchInput);
  const setSearchInput = useStore((state) => state.setSearchInput);
  const navigate = useNavigate();

  /**
   * Handles the search input submission.
   * If the input is not empty, it navigates to the search results page
   * with the search input as a parameter and resets the input field.
   */
  function handleSearch() {
    searchLog.verbose("handleSearch");
    if (searchInput !== "") {
      navigate(`/search/${searchInput}`);
      setSearchInput("");
    }
  }

  return (
    <>
      <form
        className="flex flex-row items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          className="h-7 w-96 rounded-2xl border-0 bg-gray-100 px-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="text"
          name="searchInput"
          id="searchInput"
          placeholder="Search for a stock symbol or company name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <input type="submit" hidden />
        <div
          className="-translate-x-8 cursor-pointer text-2xl text-gray-400 hover:text-gray-900"
          onClick={handleSearch}
        >
          <MdSearch />
        </div>
      </form>
    </>
  );
}
