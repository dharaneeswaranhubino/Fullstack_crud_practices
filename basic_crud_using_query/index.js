const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/config/db");
const router = require("./src/routes/indexROute");
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",router)

db.query("SELECT 1")
  .then(() => {
    console.log("DB connection succeeded");
    app.listen(process.env.PORT, (err) => {
      if (err) {
        console.log("some error occured");
      }
      console.log("Server runing on port 5000");
    });
  })
  .catch((err) => {
    console.log(`db connection failed on ${err}`);
  });

// app.listen(process.env.PORT, (err) => {
//       if (err) {
//         console.log("some error occured");
//       }
//       console.log("Server runing on port 5000");
//     });
