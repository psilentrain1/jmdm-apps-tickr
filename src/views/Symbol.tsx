import { useParams } from "react-router";

export function Ticker() {
  const { ticker } = useParams();
  return (
    <>
      <h1>Symbol page</h1>
      <p>{ticker}</p>
    </>
  );
}
