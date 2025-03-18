import { useEffect } from "react";
import { useParams } from "react-router";
import { TickerChart } from "../components/Charts";
import { useStore } from "../hooks/useStore";

export function Ticker() {
  const { ticker } = useParams();
  const tickerInfo = useStore((state) => state.tickerInfo);
  const setTickerInfo = useStore((state) => state.setTickerInfo);

  async function getTickerInfo() {
    setTickerInfo(await window.api?.getTickerInfo(ticker));
  }

  useEffect(() => {
    getTickerInfo();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between pb-2">
        <div>
          <h1 className="text-2xl font-bold">
            {tickerInfo[0].ticker_name}
            {" ("}
            {tickerInfo[0].ticker}
            {")"}
          </h1>
          <div className="text-gray-400">
            {tickerInfo[0].sector}
            {" - "}
            {tickerInfo[0].industry}
          </div>
        </div>

        <div>
          <div className="text-2xl font-bold">
            {"$"}
            {tickerInfo[2].close}
          </div>
          <div>
            <span>points</span>
            <span>percentage</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between pb-4">
        <span>Open: ${tickerInfo[2].open}</span>
        <span>High: ${tickerInfo[2].high}</span>
        <span>Low: ${tickerInfo[2].low}</span>
        <span>Close: ${tickerInfo[2].close}</span>
        <span>Volume: {tickerInfo[2].volume}</span>
      </div>
      <div>
        <TickerChart ticker={ticker} />
      </div>
      <div>
        <h2 className="font-bold">Description:</h2>
        <p>{tickerInfo[0].description}</p>
      </div>
    </>
  );
}
