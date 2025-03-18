import { useEffect } from "react";
import { useParams } from "react-router";
import { TickerChart } from "../components/Charts";
import { useStore } from "../hooks/useStore";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

export function Ticker() {
  const { ticker } = useParams();
  const tickerInfo = useStore((state) => state.tickerInfo);
  const setTickerInfo = useStore((state) => state.setTickerInfo);
  // const gainLoss = useStore((state) => state.gainLoss);
  // const setGainLoss = useStore((state) => state.setGainLoss);

  /* function calcGainLoss(a: number, b: number) {
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

  async function getTickerInfo() {
    setTickerInfo(await window.api?.getTickerInfo(ticker));
  }

  useEffect(() => {
    getTickerInfo();
  }, []);

  /*  useEffect(() => {
    setGainLoss(calcGainLoss(tickerInfo[2].close, tickerInfo[1].close));
  }, [tickerInfo]); */

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
          <div className="flex flex-row items-center text-2xl font-bold">
            {tickerInfo[2] ? (
              <span className="text-4xl text-green-600">
                <MdArrowDropUp />
              </span>
            ) : (
              <span className="text-4xl text-red-600">
                <MdArrowDropDown />
              </span>
            )}
            {"$"}
            {tickerInfo[1].close.toFixed(2)}
          </div>
          <div className="flex flex-row justify-between">
            <span>{tickerInfo[3].toFixed(2)}</span>
            <span>
              {tickerInfo[2] ? "+" : "-"}
              {tickerInfo[4].toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between pb-4">
        <span>Open: ${tickerInfo[1].open}</span>
        <span>High: ${tickerInfo[1].high}</span>
        <span>Low: ${tickerInfo[1].low}</span>
        <span>Close: ${tickerInfo[1].close}</span>
        <span>Volume: {tickerInfo[1].volume}</span>
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
