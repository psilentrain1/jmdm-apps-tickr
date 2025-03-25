import { useStore } from "../hooks/useStore";
import { WatchlistGains } from "./Charts";

export function Gains() {
  const watchlist = useStore((state) => state.watchlist);
  return (
    <section>
      <h2 className="text-2xl font-bold">Watchlist Gain/Loss</h2>
      {Object.keys(watchlist).length > 0 ? (
        <WatchlistGains />
      ) : (
        <p>No tickers in your watchlist.</p>
      )}
    </section>
  );
}
