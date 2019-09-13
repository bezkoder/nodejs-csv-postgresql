const Pool = require("pg").Pool;
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

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

      const csvWriter = createCsvWriter({
        path: "bezkoder_postgresql_csvWriter.csv",
        header: [
          { id: "id", title: "id" },
          { id: "name", title: "name" },
          { id: "description", title: "description" },
          { id: "created_at", title: "created_at" }
        ]
      });

      csvWriter
        .writeRecords(jsonData)
        .then(() =>
          console.log("Write to bezkoder_postgresql_csvWriter.csv successfully!")
        );
    }
  });
});
