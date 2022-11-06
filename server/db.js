const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const queryServices = require("../services/query");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  // landing route
  res.send([]);
});

let db = new sqlite3.Database("./server/db/instances.json", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the db database.");
});

db.serialize(() => {
  console.log(`doing db.seralize from db.js`);
  db.run(
    `CREATE TABLE if not exists instances(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      queryId TEXT NOT NULL,
      sightings TEXT NOT NULL,
      queryContent TEXT NOT NULL,
      created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    `
  );
});

app.get("/query/:queryId", async (req, res, next) => {
  let db = new sqlite3.Database("./server/db/instances.json", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the db database.");
  });
  // creates table if one doesn't exist

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Close the database connection.");
  });
  console.log("/ accessed");
  console.log(req.params.queryId);
  try {
    const query = await queryServices.getQuery(req.params.queryId);
    res.send(query);
  } catch (e) {
    next(e);
  }
});

console.log("listening on port 3000");
app.listen(3000);
