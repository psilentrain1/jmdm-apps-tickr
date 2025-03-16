import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { useStore } from "../hooks/useStore";

export function SearchResults() {
  const { param } = useParams();
  const searchResults = useStore((state) => state.searchResults);
  const setSearchResults = useStore((state) => state.setSearchResults);

  async function getResults() {
    console.log("getResults");
    const results = await window.api?.search(param);
    setSearchResults(results);
  }

  useEffect(() => {
    if (param) {
      getResults();
    }
  }, [param]);

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-200">
        Search Results: <span>{param}</span>
      </h1>
      <div id="results">
        {searchResults.map((result) => (
          <div
            key={result.ticker_id}
            className="border-b-2 border-gray-100 px-4 py-2 text-gray-200"
          >
            <h3>
              <Link
                className="text-2xl underline transition-colors duration-200 hover:text-blue-400 active:text-blue-600"
                to={`/ticker/${result.ticker}`}
              >
                {result.ticker_name}
              </Link>
            </h3>
            <div className="flex flex-row items-center justify-start gap-4">
              <span>
                <span className="text-gray-500">Ticker: </span>
                {result.ticker}
              </span>
              <span>
                <span className="text-gray-500">Sector: </span>
                {result.sector}
              </span>
              <span>
                <span className="text-gray-500">Industry: </span>
                {result.industry}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
