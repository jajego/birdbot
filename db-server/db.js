const sqlite3 = require("sqlite3").verbose();

// open the database
let db = new sqlite3.Database("./db-server/db/instances.db", (err) => {
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
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  `
  );

  db.each("SELECT * FROM instances", (err, row) => {
    console.log(row);
    console.log(row.id, row.queryId, row.sightings, row.created);
  });
});

// const getInstances = async (db) => {
//   return new Promise((res, rej) => {
//     db.get(`SELECT * FROM instances`, (err, row) => {
//       if (err) rej(err);
//       res(row);
//     });
//   });
// };

// const fulfillInstances = async (db) => {
//   const instances = await getInstances(db);
//   return instances;
// };

// fulfillInstances(db).then((response) => console.log(response));

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Close the database connection.");
});
