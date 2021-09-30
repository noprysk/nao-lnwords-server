require("./config/database").connect();
const express = require("express");
const userRoute = require("./routes/userRoute");
const groupRoute = require("./routes/groupRoute");

const app = express();

app.use(express.json());

app.use("/user", userRoute);
app.use("/groups", groupRoute);

module.exports = app;