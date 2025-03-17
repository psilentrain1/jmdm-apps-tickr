import { useEffect } from "react";
import { useStore } from "../hooks/useStore";
import { DateRange } from "../types/component.types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

ChartJS.defaults.color = "oklch(0.967 0.003 264.542)";

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        // position: "top" as const,
      },
      title: {
        display: false,
        // text: "Chart.js Line Chart",
      },
      tooltip: {
        callbacks: {
          afterTitle: function (context) {
            return `${context[0].formattedValue}`;
          },
          label: function () {
            return "";
          },
          afterBody: function (context) {
            return `Open: ${tickerChartData[context[0].dataIndex].open}
High: ${tickerChartData[context[0].dataIndex].high}
Low: ${tickerChartData[context[0].dataIndex].low}
Close: ${tickerChartData[context[0].dataIndex].close}
Volume: ${tickerChartData[context[0].dataIndex].volume}`;
          },
        },
      },
    },
  };

  const labels: string[] = tickerChartData.map((item) => {
    const date = new Date(item.date);
    return `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: "Close",
        data: tickerChartData.map((item) => item.close),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        pointStyle: false,
      },
    ],
  };

  return (
    <div>
      <div className="flex w-full flex-row items-center justify-end">
        <div>
          <label htmlFor="dateRangeSelect">Date Range: </label>
          <select
            className="focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
      </div>
      <Line options={options} data={data} />
    </div>
  );
}
