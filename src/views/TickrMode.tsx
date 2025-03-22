import { useEffect } from "react";
import { useStore } from "../hooks/useStore";
import { MdArrowDropDown, MdArrowDropUp, MdOpenInFull } from "react-icons/md";

export function TickrMode() {
  const watchlist = useStore((state) => state.watchlist);
  // const setWatchlist = useStore((state) => state.setWatchlist);
  const setTickrMode = useStore((state) => state.setTickrMode);

  async function handleExitTickrMode() {
    const mode = await window.ui.exitTickrMode();
    setTickrMode(false);
    console.log(mode);
  }

  function addAnimation() {
    const ticker = document.getElementById("ticker");

    const tickerContent = Array.from(ticker.children);
    tickerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as HTMLElement;
      duplicatedItem.setAttribute("aria-hidden", "true");
      ticker.appendChild(duplicatedItem);
    });
  }
  useEffect(() => {
    addAnimation();
  }, []);

  /*   async function getWatchlist() {
    const watchlist = await window.watchlist.getWatchlist();
    setWatchlist(watchlist);
    // setWatchlistTickers(Object.keys(watchlist));
  } */
  return (
    <div className="flex h-full flex-row items-center bg-gray-900 px-4 text-gray-100">
      <div>
        <div className="flex flex-row items-center justify-center px-4 text-3xl font-bold">
          Tickr
        </div>
      </div>
      <div
        id="tickerContainer"
        className="inline-flex flex-grow flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_20px,_black_calc(100%-20px),transparent_100%)]"
      >
        {/* Scrolling ticker here */}
        <ul
          id="ticker"
          className="tickr flex items-center justify-center md:justify-start [&_li]:mx-6"
        >
          {Object.keys(watchlist).map((ticker) => (
            <li
              key={ticker}
              className="flex flex-row items-center gap-1 text-sm"
            >
              <span className="font-bold">{ticker}</span>
              {watchlist[ticker][2] ? (
                <span className="text-2xl text-green-600">
                  <MdArrowDropUp />
                </span>
              ) : (
                <span className="text-2xl text-red-600">
                  <MdArrowDropDown />
                </span>
              )}
              <span>
                {"$"}
                {watchlist[ticker][1].close.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div
          className="cursor-pointer text-2xl"
          onClick={() => handleExitTickrMode()}
        >
          <MdOpenInFull />
        </div>
      </div>
    </div>
  );
}
