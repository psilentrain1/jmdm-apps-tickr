export function Settings() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="pb-2 text-3xl font-bold">Settings</h1>
      <div className="">
        <div className="flex flex-row items-center justify-between border-y-1 border-gray-100 px-4 py-2">
          <span>Default date range for charts:</span>
          <select name="dateRange" id="dateRange">
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
