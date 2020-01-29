const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());

//Setup CORS
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.static("public"));
let dbUrl;

if (process.env.NODE_ENV === "production") {
  dbUrl = config.get("mongoURI");
} else {
  dbUrl = config.get("mongoURILocal");
}

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 50,
    w: "majority",
    wtimeout: 2500
  })
  .then(() => console.log("APP CONNECTED TO MONGOOSE ATLAS"))
  .catch(error => console.log("CANNOT CONNECT TO MONGO ATLAS: ", error));

app.use("/api/fabric", require("./route/fabric"));
app.use("/api/accessories", require("./route/accessories"));
app.use("/api/customer", require("./route/customer"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("APP IS RUNNING ON PORT " + port);
});
