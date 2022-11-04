const sqlite3 = require("sqlite3").verbose();
const crypto = require("crypto");

const addQuery = async (query) => {
  console.log(`Logging from addQuery:`);
  console.log(query);
  let db = new sqlite3.Database("./server/db/instances.json", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the db database.");
  });
  // Accepts query JSON object and adds it to the database
  db.serialize(() => {
    db.run(
      `INSERT INTO instances(queryId, sightings) VALUES (?, ?)`,
      [query.queryId, query.sightings],
      (err) =>
        err
          ? console.log(err.message)
          : console.log(`A row has been inserted for ${query.queryId}`)
    );
  });
  db.close();
};

const getQuery = async (queryId) => {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database("./server/db/instances.json", (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the db database.");
    });
    var responseObj;
    db.all(`SELECT * FROM instances WHERE queryId=?`, queryId, (err, rows) => {
      if (err) {
        responseObj = {
          error: err,
        };
      } else {
        responseObj = {
          rows: rows,
        };
        resolve(responseObj);
      }
      db.close();
    });
  });
};

module.exports = {
  addQuery,
  getQuery,
};
