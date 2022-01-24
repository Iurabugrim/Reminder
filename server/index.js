require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes");
const sequelize = require("./db");
const model = require("./model/model")
const path = require('path')
const ErrorHandler = require('./middleware/ErrorHandingMiddleware')

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);
app.use(express.static(path.join(__dirname + 'static')))

app.use(ErrorHandler)

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Starting server on ${PORT} port`);
    });
  } catch (e) {
    console.log(e.message);
  }
}

start();
