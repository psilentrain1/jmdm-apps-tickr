import { app } from "electron";
import fs from "fs";
import path from "path";
import sqlite from "better-sqlite3";
import { Ticker } from "../types/api.types";
import { dbLoc, db } from "../index";
import { getAPITickerInfo } from "./api.utils";
import { DateRange } from "../types/component.types";

export function createDB() {
  //   const filepath = path.join(app.getPath("appData"), "Tickr");
  //   fs.mkdirSync(filepath, { recursive: true });
  //   fs.closeSync(fs.openSync(dbLoc, "w"));

  db.pragma("journal_mode = WAL");
  console.log("New Database: ", db);

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

  const query6 = `INSERT INTO settings (setting_key, setting_value) VALUES ('watched_symbols', '[]');`;

  db.prepare(query1).run();
  db.prepare(query2).run();
  db.prepare(query3).run();
  db.prepare(query4).run();
  db.prepare(query5).run();
  db.prepare(query6).run();
  console.log("Database created at: ", dbLoc);
}

// TODO: updateDB()
// Maybe check against DB version and check tables

// Get Ticker Info
export function getTickerInfo(symbol: string) {
  const stmtTicker = db.prepare(`SELECT * FROM ticker WHERE ticker = ?;`);
  const stmtLastClose = db.prepare(
    `SELECT * FROM (SELECT * FROM data_cache WHERE ticker = ? ORDER BY date DESC LIMIT 2) ORDER BY date ASC;`,
  );
  const ticker = stmtTicker.all(symbol);
  const lastClose = stmtLastClose.all(symbol);

  if (ticker.length === 0) {
    // Get the ticker info from the API
    getAPITickerInfo(symbol);
  } else {
    // Return the ticker info from the DB
    return ticker.concat(lastClose);
  }
}

// Add Ticker Info
export function addTickerInfo(tickerInfo: Ticker) {
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

export function searchDB(searchParam: string) {
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

export function getDBPrices(ticker: string, dateRange: DateRange) {
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

// Watchlist
export function getWatchlistDB() {
  const stmt = db.prepare(
    "SELECT setting_value FROM settings WHERE setting_key = 'watched_tickers';",
  );

  const result = stmt.get();
  const list = result.setting_value.split(",");
  return list;
}

export function setWatchlistDB(watchlist: string[]) {
  const stmt = db.prepare(
    "UPDATE settings SET setting_value = ? WHERE setting_key = 'watched_tickers';",
  );

  const result = stmt.run(watchlist.join(","));
  return result;
}
