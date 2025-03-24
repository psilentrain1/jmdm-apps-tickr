import {
  Prices,
  Setting,
  Ticker,
  TickerInfo,
  Watchlist,
} from "../types/api.types";
import { dbLoc, db } from "../index";
import { DateRange } from "../types/component.types";
import log from "electron-log/main";

const dbLog = log.scope("db.utils");

/**
 * Creates a new Database file in the database location
 * and initializes the necessary tables and default values.
 */
export function createDB() {
  //   const filepath = path.join(app.getPath("appData"), "Tickr");
  //   fs.mkdirSync(filepath, { recursive: true });
  //   fs.closeSync(fs.openSync(dbLoc, "w"));

  db.pragma("journal_mode = WAL");

  const query1 = `CREATE TABLE db (
    db_key TEXT PRIMARY KEY NOT NULL,
    db_value TEXT
    );`;

  const query2 = `INSERT INTO db (db_key, db_value) VALUES ('db_version', '0.1');`;

  const query3 = `CREATE TABLE ticker (
    ticker_id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker TEXT NOT NULL,
    ticker_type TEXT,
    ticker_name TEXT,
    industry TEXT,
    sector TEXT,
    description TEXT,
    cached_date TEXT
    );`;

  const query4 = `CREATE TABLE data_cache (
    data_id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker TEXT NOT NULL,
    date TEXT NOT NULL,
    close REAL,
    volume INTEGER,
    open REAL,
    high REAL,
    low REAL
    );`;

  const query5 = `CREATE TABLE settings (
    setting_key TEXT PRIMARY KEY NOT NULL,
    setting_value TEXT
    );`;

  const query6 = `INSERT INTO settings (setting_key, setting_value) VALUES ('watched_symbols', '[]'), ('default_date_range', '3m');`;

  db.prepare(query1).run();
  db.prepare(query2).run();
  db.prepare(query3).run();
  db.prepare(query4).run();
  db.prepare(query5).run();
  db.prepare(query6).run();
  dbLog.info("Database created at: ", dbLoc);
}

// FUTURE: updateDB()
// Maybe check against DB version and check tables

/**
 * Fetches ticker information from the database.
 * FUTURE: If the ticker is not found, it can be fetched from an API.
 * @param {string} symbol
 * @returns {TickerInfo | null} Returns ticker information or null if not found.
 */
export function getTickerInfo(symbol: string): TickerInfo | null {
  dbLog.verbose("getTickerInfo: ", symbol);
  const stmtTicker = db.prepare(`SELECT * FROM ticker WHERE ticker = ?;`);
  const stmtLastClose = db.prepare(
    `SELECT * FROM (SELECT * FROM data_cache WHERE ticker = ? ORDER BY date DESC LIMIT 2) ORDER BY date ASC;`,
  );
  const ticker = stmtTicker.get(symbol) as Ticker | undefined;
  const lastClose = stmtLastClose.all(symbol) as Prices[];

  /*  if (!ticker || lastClose.length < 2) {
    // If not found, fetch from API or return null
    getAPITickerInfo(symbol);
    return null;
  } */
  const a = lastClose[1].close;
  const b = lastClose[0].close;
  let gain: boolean;
  if (a > b) {
    gain = true;
  } else {
    gain = false;
  }

  const diff = a - b;
  const percent = (Math.abs(a - b) / ((a + b) / 2)) * 100;

  return [ticker, lastClose[1], gain, diff, percent];
}

/**
 * Adds ticker information to the database.
 * @param {Ticker} tickerInfo - Ticker information to be added to the database.
 * @returns
 */
export function addTickerInfo(tickerInfo: Ticker) {
  dbLog.verbose("addTickerInfo: ", tickerInfo);
  const query = `INSERT INTO ticker (ticker, ticker_type, ticker_name, industry, sector, description, cached_date) VALUES (?, ?, ?, ?, ?, ?, ?);`;
  const result = db
    .prepare(query)
    .run(
      tickerInfo.ticker,
      tickerInfo.ticker_type,
      tickerInfo.ticker_name,
      tickerInfo.industry,
      tickerInfo.sector,
      tickerInfo.description,
      new Date().toISOString(),
    );

  return result;
}

/**
 * Searches the database for tickers based on a search parameter.
 * @param {string} searchParam - The search parameter to filter tickers by ticker, name, industry, or sector.
 * @returns {string[]} An array of ticker information matching the search parameter.
 */
export function searchDB(searchParam: string) {
  dbLog.verbose("searchDB: ", searchParam);
  const stmt = db.prepare(
    "SELECT * FROM ticker WHERE ticker LIKE ? OR ticker_name LIKE ? OR industry LIKE ? OR sector LIKE ?;",
  );
  const result = stmt.all(
    `%${searchParam}%`,
    `%${searchParam}%`,
    `%${searchParam}%`,
    `%${searchParam}%`,
  );

  return result;
}

/**
 * Gets prices from the database for a specific ticker and date range.
 * @param {string} ticker - The ticker symbol for which to fetch prices.
 * @param {DateRange} dateRange - The date range for which to fetch prices (e.g., "5d", "1m", etc.).
 * @returns {Prices[]} An array of prices for the specified ticker and date range.
 */
export function getDBPrices(ticker: string, dateRange: DateRange) {
  dbLog.verbose("getDBPrices: ", ticker, dateRange);
  let returnLimit: number;
  switch (dateRange) {
    case "1d":
      returnLimit = 1;
      break;
    case "5d":
      returnLimit = 5;
      break;
    case "1m":
      returnLimit = 20;
      break;
    case "3m":
      returnLimit = 60;
      break;
    case "6m":
      returnLimit = 122;
      break;
    case "1y":
      returnLimit = 260;
      break;
    default:
      returnLimit = 260;
      break;
  }

  const stmt = db.prepare(
    "SELECT * FROM (SELECT * FROM data_cache WHERE ticker = ? ORDER BY date DESC LIMIT ?) ORDER BY date ASC;",
  );

  const result = stmt.all(ticker, returnLimit);
  return result;
}

/**
 * Gets the watchlist from the database.
 * @returns {Watchlist} An object containing the watchlist tickers and their information.
 */
export function getWatchlistDB() {
  dbLog.verbose("getWatchlistDB");
  const stmt = db.prepare(
    "SELECT setting_value FROM settings WHERE setting_key = 'watched_tickers';",
  );

  const result = stmt.get() as Setting;
  const list = result.setting_value.split(",");
  const watchedTickers: Watchlist = {};
  list.forEach((ticker) => {
    const tickerInfo: TickerInfo = getTickerInfo(ticker);
    if (tickerInfo) {
      watchedTickers[ticker] = tickerInfo;
    }
  });
  return watchedTickers;
}

/**
 * Sets the watchlist in the database.
 * This will overwrite the existing watchlist with the new one provided.
 * @param {string[]} watchlist - An array of ticker symbols to set as the watchlist in the database.
 * @returns
 */
export function setWatchlistDB(watchlist: string[]) {
  dbLog.verbose("setWatchlistDB: ", watchlist);
  const stmt = db.prepare(
    "UPDATE settings SET setting_value = ? WHERE setting_key = 'watched_tickers';",
  );

  const result = stmt.run(watchlist.join(","));
  return result;
}

// FIXME: Create type for setting value
/**
 * Retrieves a specific setting from the database.
 * @param {string} settingName - The name of the setting to retrieve from the database.
 * @returns Setting Value
 */
export function getSettingDB(settingName: string) {
  dbLog.verbose("getSettingDB: ", settingName);
  const stmt = db.prepare(
    "SELECT setting_value FROM settings WHERE setting_key = ?;",
  );

  const result = stmt.get(settingName);
  return result;
}

/**
 * Updates a specific setting in the database.
 * @param {string} settingName The name of the setting to update in the database.
 * @param {string} settingValue The new value to set for the specified setting in the database.
 *
 */
export function setSettingDB(settingName: string, settingValue: string) {
  dbLog.verbose("setSettingDB: ", settingName, settingValue);
  const stmt = db.prepare(
    "UPDATE settings SET setting_value = ? WHERE setting_key = ?;",
  );

  const result = stmt.run(settingValue, settingName);
  return result;
}
