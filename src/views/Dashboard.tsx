import { useEffect } from "react";
import log from "electron-log/renderer";
import { useStore } from "../hooks/useStore";
import { Gains } from "../components/Gains.Dashboard";
import { AAG } from "../components/AAG.Dashboard";
import { Watched } from "../components/Watched.Dashboard";
import { Loading } from "../components/Loading";
import { DateRange } from "../types/component.types";

const dashboardLog = log.scope("Dashboard");

export function Dashboard() {
  const setWatchlist = useStore((state) => state.setWatchlist);
  const setTickerChartTimeRange = useStore(
    (state) => state.setTickerChartTimeRange,
  );
  const isLoading = useStore((state) => state.isLoading);
  const setIsLoading = useStore((state) => state.setIsLoading);

  /**
   * Fetches the watchlist from the database and updates the store.
   */
  async function getWatchlist() {
    dashboardLog.verbose("getWatchlist");
    const watchlist = await window.watchlist.getWatchlist();
    setWatchlist(watchlist);
  }

  /**
   * Fetches the default date range setting from the database and updates the store.
   */
  async function setSettings() {
    dashboardLog.verbose("setSettings");
    const defaultDateRange =
      await window.settings.getSetting("default_date_range");
    setTickerChartTimeRange(defaultDateRange as DateRange);
  }

  /**
   * Initializes the dashboard by fetching the watchlist and settings.
   */
  async function startup() {
    dashboardLog.verbose("startup");
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
    </div>
  );
}
