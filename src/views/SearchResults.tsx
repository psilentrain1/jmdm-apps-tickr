import { useParams } from "react-router";

export function SearchResults() {
  const { param } = useParams();

  async function getResults() {
    const results = window.api?.search(param);
    console.log("Search results: ", await results);
  }

  getResults();

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-200">
        Search Results: <span>{param}</span>
      </h1>
    </>
  );
}
