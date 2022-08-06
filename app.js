const express = require("express");
const morgan = require("morgan");
const app = express();
const mysql = require("./database/database")
//para que pueda usar json
app.use(express.json());
app.set("json spaces", 2)

app.set("port", process.env.PORT || 3000);
app.use(require("./routes/routers"))
//middlewares
app.use(morgan("dev"));


module.exports = app;