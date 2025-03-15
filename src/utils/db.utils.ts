import { app } from "electron";
import fs from "fs";
import path from "path";
import sqlite from "better-sqlite3";
import { Ticker } from "../types/api.types";
import { dbLoc } from "../index";
import { getAPITickerInfo } from "./api.utils";

// Create the database connection
export const db = new sqlite(dbLoc);

export function createDB() {
  //   const filepath = path.join(app.getPath("appData"), "Tickr");
  //   fs.mkdirSync(filepath, { recursive: true });
  //   fs.closeSync(fs.openSync(dbLoc, "w"));
  const database = new sqlite(dbLoc);

  database.pragma("journal_mode = WAL");

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
    low REAL,
    FOREIGN KEY(ticker) REFERENCES ticker(ticker)
    );`;

  const query5 = `CREATE TABLE settings (
    setting_key TEXT PRIMARY KEY NOT NULL,
    setting_value TEXT
    );`;

  const query6 = `INSERT INTO settings (setting_key, setting_value) VALUES ('watched_symbols', '[]');`;

  database.prepare(query1).run();
  database.prepare(query2).run();
  database.prepare(query3).run();
  database.prepare(query4).run();
  database.prepare(query5).run();
  database.prepare(query6).run();
  console.log("Database created at: ", dbLoc);
}

// TODO: updateDB()
// Maybe check against DB version and check tables

// Get Ticker Info
export function getTickerInfo(symbol: string) {
  const query = `SELECT * FROM symbol WHERE symbol = ${symbol};`;
  const result = db.prepare(query).all();

  if (result.length === 0) {
    // Get the ticker info from the API
    getAPITickerInfo(symbol);
  } else {
    // Return the ticker info from the DB
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
