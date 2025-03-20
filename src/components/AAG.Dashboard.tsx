import { useEffect } from "react";
import { Link } from "react-router";
import { useStore } from "../hooks/useStore";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

export function AAG() {
  const watchlist = useStore((state) => state.watchlist);
  const topMovers = useStore((state) => state.topMovers);
  const setTopMovers = useStore((state) => state.setTopMovers);

  function getMovers() {
    const percentages: [string, number][] = [];
    Object.keys(watchlist).map((ticker) => {
      let val = 0;
      val = watchlist[ticker][4];
      percentages.push([ticker, val]);
    });
    percentages.sort((a, b) => b[1] - a[1]);
    setTopMovers(percentages.slice(0, 5));
  }

  // Average Change points and percentage

  useEffect(() => {
    getMovers();
    console.log(watchlist);
  }, [watchlist]);

  return (
    <section className="border-1 border-pink-500">
      <h2 className="text-2xl font-bold">At-A-Glance</h2>
      <div>
        <div>
          <h3>Average Change:</h3>
        </div>
        <h3>Biggest Movers:</h3>
        <ol>
          {topMovers.map((ticker) => (
            <li key={ticker[0]} className="flex flex-row items-center gap-2">
              <Link
                className="underline transition-colors duration-200 hover:text-blue-500 active:text-blue-700"
                to={`/ticker/${ticker[0]}`}
              >
                {ticker[0]}
              </Link>
              {watchlist[`${ticker[0]}`][2] ? (
                <span className="text-2xl text-green-500">
                  <MdArrowDropUp />
                </span>
              ) : (
                <span className="text-2xl text-red-500">
                  <MdArrowDropDown />
                </span>
              )}
              <span>${watchlist[`${ticker[0]}`][1].close.toFixed(2)}</span>
              <span>
                {watchlist[`${ticker[0]}`][2]
                  ? watchlist[`${ticker[0]}`][4].toFixed(2)
                  : -watchlist[`${ticker[0]}`][4].toFixed(2)}
                %
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
