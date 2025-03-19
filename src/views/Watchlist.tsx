import { useEffect } from "react";
import { Link } from "react-router";
import { useStore } from "../hooks/useStore";
import { MdArrowDropDown, MdArrowDropUp, MdDelete } from "react-icons/md";

export function Watchlist() {
  const watchlist = useStore((state) => state.watchlist);
  const setWatchlist = useStore((state) => state.setWatchlist);
  const watchlistTickers = useStore((state) => state.watchlistTickers);
  const setWatchlistTickers = useStore((state) => state.setWatchlistTickers);

  async function getWatchlist() {
    const watchlist = await window.watchlist.getWatchlist();
    setWatchlist(watchlist);
    setWatchlistTickers(Object.keys(watchlist));
  }

  async function updateWatchlist() {
    await window.watchlist.setWatchlist(watchlistTickers);
    getWatchlist();
  }

  function handleTickerReorder(e, ticker: string) {
    const tickers = watchlistTickers;
    const index = watchlistTickers.indexOf(ticker);
    tickers.splice(index, 1);
    tickers.splice(e.nativeEvent.data - 1, 0, ticker);
    setWatchlistTickers(tickers);
    updateWatchlist();
  }

  function handleMoveUp(ticker: string) {
    const tickers = watchlistTickers;
    const index = watchlistTickers.indexOf(ticker);
    if (index == 0) {
      return;
    }
    tickers.splice(index, 1);
    tickers.splice(index - 1, 0, ticker);
    setWatchlistTickers(tickers);
    updateWatchlist();
  }

  function handleMoveDown(ticker: string) {
    const tickers = watchlistTickers;
    const index = watchlistTickers.indexOf(ticker);
    if (index == watchlistTickers.length - 1) {
      return;
    }
    tickers.splice(index, 1);
    tickers.splice(index + 1, 0, ticker);
    setWatchlistTickers(tickers);
    updateWatchlist();
  }

  function handleDeleteTicker(ticker: string) {
    const tickers = watchlistTickers;
    const index = watchlistTickers.indexOf(ticker);
    tickers.splice(index, 1);
    setWatchlistTickers(tickers);
    updateWatchlist();
  }

  /*   function calcGainLoss(a: number, b: number) {
    let gain: boolean;
    if (a > b) {
      gain = true;
    } else {
      gain = false;
    }

    const diff = a - b;
    const percent = (Math.abs(a - b) / ((a + b) / 2)) * 100;

    return { gain, diff, percent };
  } */

  useEffect(() => {
    getWatchlist();
  }, []);

  /* useEffect(() => {
    console.log(watchlist);
    console.log(watchlistTickers);
  }, [watchlist]); */
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-200">Watchlist</h1>
      <div id="watchlist">
        {Object.keys(watchlist).map((ticker) => (
          <div
            key={ticker}
            className="flex flex-row items-center justify-between border-b-2 border-gray-100 px-4 py-2 text-gray-200"
          >
            <div className="flex flex-row items-center gap-4">
              <div>
                <input
                  type="text"
                  name={`${ticker}`}
                  id={`${ticker}`}
                  value={watchlistTickers.indexOf(ticker) + 1}
                  onChange={(e) => handleTickerReorder(e, ticker)}
                  className="w-8 bg-gray-900 text-center focus:ring-0 focus:outline-none"
                />
              </div>
              <div className="flex flex-row items-end gap-2">
                <Link
                  to={`/ticker/${ticker}`}
                  className="text-2xl font-bold underline transition-colors duration-200 hover:text-blue-400 active:text-blue-600"
                >
                  {watchlist[ticker][0].ticker_name}
                </Link>
                <span className="text-gray-400">{ticker}</span>
                <div className="flex flex-row items-center">
                  {watchlist[ticker][2] ? (
                    <span className="text-2xl text-green-600">
                      <MdArrowDropUp />
                    </span>
                  ) : (
                    <span className="text-2xl text-red-600">
                      <MdArrowDropDown />
                    </span>
                  )}
                  {"$"}
                  {watchlist[ticker][1].close.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-col items-center text-2xl">
                <span
                  className="transition-colors duration-200 hover:text-blue-400 active:text-blue-600"
                  onClick={() => handleMoveUp(ticker)}
                >
                  <MdArrowDropUp />
                </span>
                <span
                  className="transition-colors duration-200 hover:text-blue-400 active:text-blue-600"
                  onClick={() => handleMoveDown(ticker)}
                >
                  <MdArrowDropDown />
                </span>
              </div>
              <div
                className="text-2xl transition-colors duration-200 hover:text-red-400 active:text-red-600"
                onClick={() => handleDeleteTicker(ticker)}
              >
                <MdDelete />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
