import { useState, useEffect } from "react";
import { useStore } from "../hooks/useStore";
import { DateRange } from "../types/component.types";

export function Settings() {
  // const tickerChartTimeRange = useStore((state) => state.tickerChartTimeRange);
  const setTickerChartTimeRange = useStore(
    (state) => state.setTickerChartTimeRange,
  );

  const [dateRange, setDateRange] = useState<DateRange>("1y");

  async function getDBData() {
    const result = await window.settings.getSetting("default_date_range");
    setDateRange(result.setting_value);
  }

  function handleDateRangeChange(dateRange: DateRange) {
    window.settings.setSetting("default_date_range", dateRange);
    setDateRange(dateRange);
    setTickerChartTimeRange(dateRange);
  }

  useEffect(() => {
    getDBData();
  }, []);

  useEffect(() => {
    const defaultDateRangeSelect = document.getElementById(
      "dateRange",
    ) as HTMLSelectElement;
    defaultDateRangeSelect.value = dateRange;
  }, [dateRange]);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="pb-2 text-3xl font-bold">Settings</h1>
      <div className="">
        <div className="flex flex-row items-center justify-between border-y-1 border-gray-100 px-4 py-2">
          <span>Default date range for charts:</span>
          <select
            name="dateRange"
            id="dateRange"
            onChange={(e) => handleDateRangeChange(e.target.value as DateRange)}
          >
            <option value="5d">5 days</option>
            <option value="1m">1 month</option>
            <option value="3m">3 months</option>
            <option value="6m">6 months</option>
            <option value="1y">1 year</option>
          </select>
        </div>
      </div>
    </div>
  );
}
