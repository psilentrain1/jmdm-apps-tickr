// import { Ticker } from "../types/api.types";
const api_key = process.env.API_KEY;

// Get Ticker Info
export function getAPITickerInfo(ticker: string) {
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
      console.error("Error fetching ticker info:", error);
      //   return null;
    });
  return response;
}
