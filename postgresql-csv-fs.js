const Pool = require("pg").Pool;
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

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

      const json2csvParser = new Json2csvParser({ header: true });
      const csv = json2csvParser.parse(jsonData);

      fs.writeFile("bezkoder_postgresql_fs.csv", csv, function(error) {
        if (error) throw error;
        console.log("Write to bezkoder_postgresql_fs.csv successfully!");
      });
    }
  });
});
