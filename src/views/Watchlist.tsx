import { useEffect } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import log from "electron-log/renderer";
import { useStore } from "../hooks/useStore";
import { MdArrowDropDown, MdArrowDropUp, MdDelete } from "react-icons/md";

const watchlistLog = log.scope("Watchlist");

export function Watchlist() {
  const watchlist = useStore((state) => state.watchlist);
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-200">Watchlist</h1>
      {Object.keys(watchlist).length > 0 ? (
        <WatchlistList />
      ) : (
        <p>No tickers in your watchlist.</p>
      )}
    </div>
  );
}

export function WatchlistList() {
  const watchlist = useStore((state) => state.watchlist);
  const setWatchlist = useStore((state) => state.setWatchlist);
  const watchlistTickers = useStore((state) => state.watchlistTickers);
  const setWatchlistTickers = useStore((state) => state.setWatchlistTickers);

  /**
   * Fetches the watchlist from the database and updates the state.
   */
  async function getWatchlist() {
    watchlistLog.verbose("getWatchlist");
    const watchlist = await window.watchlist.getWatchlist();
    setWatchlist(watchlist);
    setWatchlistTickers(Object.keys(watchlist));
  }

  /**
   * Updates the watchlist in the database with the current state.
   */
  async function updateWatchlist() {
    watchlistLog.verbose("updateWatchlist");
    await window.watchlist.setWatchlist(watchlistTickers);
    getWatchlist();
  }

  /**
   * Handles the reordering of tickers in the watchlist when the input value changes.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input.
   * @param {string} ticker - The ticker symbol to reorder.
   */
  function handleTickerReorder(
    e: React.ChangeEvent<HTMLInputElement>,
    ticker: string,
  ) {
    watchlistLog.verbose("handleTickerReorder", {
      ticker,
      value: e.target.value,
    });
    const tickers = watchlistTickers;
    const index = watchlistTickers.indexOf(ticker);
    tickers.splice(index, 1);
    const newIndex = parseInt(e.target.value, 10) - 1;
    tickers.splice(newIndex, 0, ticker);
    setWatchlistTickers(tickers);
    updateWatchlist();
  }

  /**
   * Handles moving a ticker up in the watchlist.
   * @param {string} ticker - The ticker symbol to move up.
   */
  function handleMoveUp(ticker: string) {
    watchlistLog.verbose("handleMoveUp", { ticker });
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

  /**
   * Handles moving a ticker down in the watchlist.
   * @param {string} ticker - The ticker symbol to move down.
   */
  function handleMoveDown(ticker: string) {
    watchlistLog.verbose("handleMoveDown", { ticker });
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

  /**
   * Handles deleting a ticker from the watchlist.
   * @param {string} ticker - The ticker symbol to delete.
   */
  function handleDeleteTicker(ticker: string) {
    watchlistLog.verbose("handleDeleteTicker", { ticker });
    const tickers = watchlistTickers;
    const index = watchlistTickers.indexOf(ticker);
    tickers.splice(index, 1);
    setWatchlistTickers(tickers);
    updateWatchlist();
    toast.success(`${ticker} removed from watchlist`);
  }

  useEffect(() => {
    getWatchlist();
  }, []);

  return (
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
  );
}
