const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const financeRoute = require("./routes/financeRoute");
const expensesRoute = require("./routes/expensesRoute");
const incomeRoute = require("./routes/incomeRoute");
const moneyPaymentRoute = require("./routes/moneyPaymentRoute");
const memberRoute = require("./routes/memberRoute");
const moneyPaymentRoute = require("./routes/moneyPaymentRoute");

const fs = require("fs");
//---------------------------------------------------------- server ----------------------------------------------------------
// ip = "172.26.6.111";
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);

//---------------------------------------------------------- MongoDB connect -----------------------------------------------------
const mongoose = require("mongoose");
const memberModel = require("./models/memberModel");
const payment_peopleModel = require("./models/payment_peopleModel");
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(`Error: ${err}`));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/api/", financeRoute);
app.use("/api/", expensesRoute);
app.use("/api/", incomeRoute);
app.use("/api/", moneyPaymentRoute);
app.use("/api/", memberRoute);
app.use("/api/", payment_peopleRoute);
