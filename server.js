const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

let dbUrl;

if (process.env.NODE_ENV === "production") {
  dbUrl = config.get("mongoURI");
} else {
  dbUrl = config.get("mongoURILocal");
}

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("APP CONNECTED TO MONGOOSE ATLAS"))
  .catch(error => console.log("CANNOT CONNECT TO MONGO ATLAS: ", error));

app.use("/fabric", require("./route/fabric"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("APP IS RUNNING ON PORT " + port);
});
