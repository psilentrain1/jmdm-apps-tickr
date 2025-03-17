import { useParams } from "react-router";
import { TickerChart } from "../components/Charts";

export function Ticker() {
  const { ticker } = useParams();

  return (
    <>
      <h1>Symbol page</h1>
      <p>{ticker}</p>
      <TickerChart ticker={ticker} />
    </>
  );
}
