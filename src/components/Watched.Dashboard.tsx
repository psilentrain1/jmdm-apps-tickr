import { Top5Chart } from "./Charts";

export function Watched() {
  return (
    <section className="col-span-2 row-span-2">
      <h2 className="text-2xl font-bold">First 5 Watched Tickers</h2>
      <Top5Chart />
    </section>
  );
}
