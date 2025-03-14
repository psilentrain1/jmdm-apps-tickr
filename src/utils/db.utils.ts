import { app } from "electron";
import { dbLoc } from "../index";
import fs from "fs";
import path from "path";
import sqlite from "better-sqlite3";

export function createDB() {
  fs.mkdirSync(path.join(app.getPath("appData"), "tickr"), { recursive: true });

  const db = new sqlite(dbLoc);
  db.pragma("journal_mode = WAL");

  const query1 = `CREATE TABLE db (
    db_key TEXT PRIMARY KEY NOT NULL,
    db_value TEXT
    );`;

  const query2 = `INSERT INTO db (db_key, db_value) VALUES ('db_version', '0.1');`;

  const query3 = `CREATE TABLE symbol (
    symbol_id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT NOT NULL,
    symbol_type TEXT,
    symbol_name TEXT,
    industry TEXT,
    sector TEXT,
    description TEXT,
    cached_date TEXT
    );`;

  const query4 = `CREATE TABLE settings (
    setting_key TEXT PRIMARY KEY NOT NULL,
    setting_value TEXT
    );`;

  const query5 = `INSERT INTO settings (setting_key, setting_value) VALUES ('watched_symbols', '[]');`;

  db.prepare(query1).run();
  db.prepare(query2).run();
  db.prepare(query3).run();
  db.prepare(query4).run();
  db.prepare(query5).run();
  console.log("Database created at: ", dbLoc);
}

// TODO: updateDB()
// Maybe check against DB version and check tables
