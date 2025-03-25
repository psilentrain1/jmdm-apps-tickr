import { useStore } from "../hooks/useStore";
import { Top5Chart } from "./Charts";

export function Watched() {
  const watchlist = useStore((state) => state.watchlist);
  return (
    <section className="col-span-2 row-span-2">
      <h2 className="text-2xl font-bold">First 5 Watched Tickers</h2>
      {Object.keys(watchlist).length > 0 ? (
        <Top5Chart />
      ) : (
        <p>No tickers in your watchlist.</p>
      )}
    </section>
  );
}
