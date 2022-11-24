const sqlite3 = require("sqlite3").verbose();
const crypto = require("crypto");

const addQuery = async (query) => {
  console.log(`Logging from addQuery:`);
  console.log(query);
  const response = await fetch("https://db.ginkgo.page/addQuery/", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(query),
  });

  return response;
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

const getRecentQueries = async () => {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database("./server/db/instances.json", (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the db database.");
    });
    var responseObj;
    db.all(
      `SELECT * FROM instances ORDER BY created DESC LIMIT 50`,
      (err, rows) => {
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
      }
    );
  });
};

module.exports = {
  addQuery,
  getQuery,
  getRecentQueries,
};
