import { useEffect } from "react";
import { useParams } from "react-router";
import { TickerChart } from "../components/Charts";

export function Ticker() {
  const { ticker } = useParams();

  async function getTickerInfo() {
    const tickerInfo = await window.api?.getTickerInfo(ticker);
    console.log(tickerInfo);
  }

  useEffect(() => {
    getTickerInfo();
  }, []);

  return (
    <>
      <h1>Symbol page</h1>
      <p>{ticker}</p>
      <TickerChart ticker={ticker} />
    </>
  );
}
