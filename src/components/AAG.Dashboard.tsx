import { useEffect } from "react";
import { Link } from "react-router";
import { useStore } from "../hooks/useStore";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

export function AAG() {
  const watchlist = useStore((state) => state.watchlist);
  const topMovers = useStore((state) => state.topMovers);
  const setTopMovers = useStore((state) => state.setTopMovers);
  const avgGainLoss = useStore((state) => state.avgGainLoss);
  const avgPercent = useStore((state) => state.avgPercent);
  const setAvgGainLoss = useStore((state) => state.setAvgGainLoss);
  const setAvgPercent = useStore((state) => state.setAvgPercent);

  function getAverages() {
    const gainLossArr: number[] = [];
    const percentArr: number[] = [];
    Object.keys(watchlist).map((ticker) => {
      gainLossArr.push(watchlist[ticker][3]);
      percentArr.push(watchlist[ticker][4]);
    });
    const gainLossSum = gainLossArr.reduce((a, b) => a + b, 0);
    const percentSum = percentArr.reduce((a, b) => a + b, 0);
    setAvgGainLoss(gainLossSum / gainLossArr.length);
    setAvgPercent(percentSum / percentArr.length);
  }

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
    getAverages();
  }, [watchlist]);

  return (
    <section>
      <h2 className="text-2xl font-bold">At-A-Glance</h2>
      <div className="flex flex-row gap-2">
        <div className="p-2">
          <h3 className="font-bold">Biggest Movers:</h3>
          <ol className="p-2">
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
        <div className="p-2">
          <h3 className="font-bold">Watchlist Average Change:</h3>
          <div className="p-2 text-2xl">
            <p>
              <span>${avgGainLoss.toFixed(2)}</span>
            </p>
            <p>
              <span>{avgPercent.toFixed(1)}%</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
