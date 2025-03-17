import { useEffect } from "react";
import { useStore } from "../hooks/useStore";
import { DateRange } from "../types/component.types";

export function TickerChart({ ticker }: { ticker: string }) {
  const tickerChartTimeRange = useStore((state) => state.tickerChartTimeRange);
  const setTickerChartTimeRange = useStore(
    (state) => state.setTickerChartTimeRange,
  );
  const tickerChartData = useStore((state) => state.tickerChartData);
  const setTickerChartData = useStore((state) => state.setTickerChartData);

  async function getPrices() {
    const prices = await window.api?.getPrices(ticker);
    if (prices) {
      setTickerChartData(prices);
    }
  }

  useEffect(() => {
    getPrices();
  }, []);

  useEffect(() => {
    console.log(tickerChartData);
  }, [tickerChartData]);

  return (
    <div>
      <div>
        <select
          name="dateRangeSelect"
          id="dateRangeSelect"
          value={tickerChartTimeRange}
          onChange={(e) => {
            setTickerChartTimeRange(e.target.value as DateRange);
          }}
        >
          <option value="1d">1 Day</option>
          <option value="5d">5 Days</option>
          <option value="1m">1 Month</option>
          <option value="3m">3 Months</option>
          <option value="6m">6 Months</option>
          <option value="1y">1 Year</option>
        </select>
      </div>
      <canvas id="tickerChart"></canvas>
    </div>
  );
}
