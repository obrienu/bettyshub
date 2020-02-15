const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
const expressSanitizer = require("express-sanitizer");
const helmet = require("helmet");

const app = express();

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(expressSanitizer());

//Setup CORS
/* var whitelist = ["http://localhost:5000/", "http://example2.com"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}; */

app.use(cors());
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
    useFindAndModify: false,
    poolSize: 50,
    w: "majority",
    wtimeout: 2500
  })
  .then(() => console.log("APP CONNECTED TO MONGOOSE ATLAS"))
  .catch(error => console.log("CANNOT CONNECT TO MONGO ATLAS: ", error));

app.use("/api/fabric", require("./route/fabric"));
app.use("/api/accessories", require("./route/accessories"));
app.use("/api/rich", require("./route/rich"));
app.use("/api/customer", require("./route/customer"));
app.use("/api/checkout", require("./route/checkout"));
app.use("/api/user", require("./route/user"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("APP IS RUNNING ON PORT " + port);
});
