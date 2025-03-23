import { useEffect, useRef } from "react";
import { useStore } from "../hooks/useStore";
import { DateRange } from "../types/component.types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  Colors,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { Watchlist } from "../types/api.types";
import { Prices } from "../types/api.types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  Colors,
);

ChartJS.defaults.color = "oklch(0.967 0.003 264.542)";

export function TickerChart({ ticker }: { ticker: string }) {
  const tickerChartRef = useRef(null);
  const tickerChartTimeRange = useStore((state) => state.tickerChartTimeRange);
  const setTickerChartTimeRange = useStore(
    (state) => state.setTickerChartTimeRange,
  );
  const tickerChartData = useStore((state) => state.tickerChartData);
  const setTickerChartData = useStore((state) => state.setTickerChartData);

  async function getPrices() {
    const prices = await window.api?.getPrices(ticker, tickerChartTimeRange);
    if (prices) {
      setTickerChartData(prices);
    }
  }

  useEffect(() => {
    getPrices();
  }, [tickerChartTimeRange]);

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
        pointRadius: 0,
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
            {/* <option value="1d">1 Day</option> */}
            <option value="5d">5 Days</option>
            <option value="1m">1 Month</option>
            <option value="3m">3 Months</option>
            <option value="6m">6 Months</option>
            <option value="1y">1 Year</option>
          </select>
        </div>
      </div>
      <Line ref={tickerChartRef} options={options} data={data} />
    </div>
  );
}

export function Top5Chart() {
  const top5ChartRef = useRef(null);
  const tickerChartTimeRange = useStore((state) => state.tickerChartTimeRange);
  const setTickerChartTimeRange = useStore(
    (state) => state.setTickerChartTimeRange,
  );
  const tickerChartData = useStore((state) => state.tickerChartData);
  const setTickerChartData = useStore((state) => state.setTickerChartData);
  const watchlist = useStore((state) => state.watchlist);
  const watchlistTickerData = useStore((state) => state.watchlistTickerData);
  const setWatchlistTickerData = useStore(
    (state) => state.setWatchlistTickerData,
  );

  // FIXME: This is hacky. Getting a random ticker to use to get dates.
  async function getYears() {
    const ticker = "AAPL";
    const prices = await window.api?.getPrices(ticker, tickerChartTimeRange);
    if (prices) {
      setTickerChartData(prices);
    }
  }

  async function getPrices() {
    const data: { [key: string]: Prices[] } = {};

    for (const ticker of Object.keys(watchlist).slice(0, 5)) {
      if (!watchlist[ticker][1]) {
        continue;
      }
      data[ticker] = await window.api?.getPrices(ticker, tickerChartTimeRange);
    }
    setWatchlistTickerData(data);
    getYears();
  }

  const options = {
    responsive: true,
    plugins: {
      colors: { enabled: true },
    },
  };

  const labels = tickerChartData.map((item) => {
    const date = new Date(item.date);
    return `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`;
  });
  const data = {
    labels: labels,
    datasets: Object.keys(watchlistTickerData).map((ticker) => {
      return {
        fill: false,
        label: ticker,
        data: watchlistTickerData[`${ticker}`].map((item) => item.close),
        pointRadius: 0,
      };
    }),
  };

  useEffect(() => {
    getPrices();
  }, [watchlist, tickerChartTimeRange]);

  useEffect(() => {
    // getPrices();
    // console.log("watchlist", watchlist);
    // console.log("watchlistTickerData", Object.values(watchlistTickerData)[0].map((item) => {}));
  }, [watchlistTickerData]);

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
            {/* <option value="1d">1 Day</option> */}
            <option value="5d">5 Days</option>
            <option value="1m">1 Month</option>
            <option value="3m">3 Months</option>
            <option value="6m">6 Months</option>
            <option value="1y">1 Year</option>
          </select>
        </div>
      </div>
      <Line ref={top5ChartRef} options={options} data={data} />
    </div>
  );
}

export function WatchlistGains() {
  const watchlistGainsRef = useRef(null);
  const watchlist = useStore((state) => state.watchlist);

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
    },
  };
  const labels: string[] = Object.keys(watchlist);
  const data = {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: "% Change",
        data: Object.values(watchlist).map((ticker) => {
          if (!ticker[2]) {
            return -ticker[4].toFixed(2);
          } else {
            return ticker[4].toFixed(2);
          }
        }),
        // TODO: Change color based on gain or loss
        // https://www.chartjs.org/docs/latest/samples/scriptable/bar.html
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Bar ref={watchlistGainsRef} options={options} data={data} />
    </div>
  );
}
