import { useEffect } from "react";
import { useStore } from "../hooks/useStore";
import { Gains } from "../components/Gains.Dashboard";
import { AAG } from "../components/AAG.Dashboard";
import { Watched } from "../components/Watched.Dashboard";

export function Dashboard() {
  const setWatchlist = useStore((state) => state.setWatchlist);

  async function getWatchlist() {
    const watchlist = await window.watchlist.getWatchlist();
    setWatchlist(watchlist);
    // setWatchlistTickers(Object.keys(watchlist));
    console.log("getWatchlist");
  }

  useEffect(() => {
    getWatchlist();
  }, []);
  return (
    <div>
      <div className="grid h-full grid-cols-2 grid-rows-3 gap-4">
        <AAG />
        <Gains />
        <Watched />
      </div>
      {/* <div></div> */}
    </div>
  );
}
