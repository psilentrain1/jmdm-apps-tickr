import { useEffect, Suspense } from "react";
import { useStore } from "../hooks/useStore";
import { Gains } from "../components/Gains.Dashboard";
import { AAG } from "../components/AAG.Dashboard";
import { Watched } from "../components/Watched.Dashboard";
import { Loading } from "../components/Loading";

export function Dashboard() {
  const setWatchlist = useStore((state) => state.setWatchlist);
  const setTickerChartTimeRange = useStore(
    (state) => state.setTickerChartTimeRange,
  );
  const isLoading = useStore((state) => state.isLoading);
  const setIsLoading = useStore((state) => state.setIsLoading);

  async function getWatchlist() {
    const watchlist = await window.watchlist.getWatchlist();
    setWatchlist(watchlist);
    // setWatchlistTickers(Object.keys(watchlist));
    console.log("getWatchlist");
  }

  async function setSettings() {
    const defaultDateRange =
      await window.settings.getSetting("default_date_range");
    setTickerChartTimeRange(defaultDateRange.setting_value);
  }

  async function startup() {
    setIsLoading(true);
    getWatchlist();
    setSettings();
    setIsLoading(false);
  }

  useEffect(() => {
    startup();
  }, []);
  return isLoading ? (
    <Loading />
  ) : (
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
