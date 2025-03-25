// FUTURE USE. NOT CURRENTLY USED.

// import { Ticker } from "../types/api.types";
import log from "electron-log/main";

const apiLog = log.scope("api.utils");
const api_key = process.env.API_KEY;

/**
 * Gets information about a specific ticker from the MarketStack API.
 * @param {string} ticker
 * @returns
 */
export function getAPITickerInfo(ticker: string) {
  apiLog.verbose("Fetching ticker info for:", ticker);
  const url = `https://api.marketstack.com/v2/tickerinfo?access_key=${api_key}&ticker=${ticker}`;
  const response = fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.data && data.data.length > 0) {
        return data.data[0];
      } else {
        throw new Error("No data found for the given ticker");
      }
    })
    .catch((error) => {
      apiLog.error("Error fetching ticker info:", error);
      //   return null;
    });
  return response;
}
