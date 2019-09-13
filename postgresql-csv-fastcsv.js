const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("bezkoder_postgresql_fastcsv.csv");

// Create a connection to the database
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "testdb",
  password: "123",
  port: 5432
});

// open the PostgreSQL connection
pool.connect((err, client, done) => {
  if (err) throw err;

  client.query("SELECT * FROM category", (err, res) => {
    done();

    if (err) {
      console.log(err.stack);
    } else {
      const jsonData = JSON.parse(JSON.stringify(res.rows));
      console.log("jsonData", jsonData);

      fastcsv
        .write(jsonData, { headers: true })
        .on("finish", function() {
          console.log("Write to bezkoder_postgresql_fastcsv.csv successfully!");
        })
        .pipe(ws);
    }
  });
});
