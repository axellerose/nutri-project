const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI || "mongodb://localhost/nutriDb";

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    console.log(`Successfully connected to the database ${DB_URI}`)
  )
  .catch((error) => {
    console.error(
      `An error ocurred trying to connect to the database ${DB_URI}: `,
      error
    );
    process.exit(1);
  });
