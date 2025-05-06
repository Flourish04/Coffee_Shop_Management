require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();

//App Use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect express
const port = 3300;
app.listen(port, () => {
  console.log("Server is listening at port 3300");
});

// Conenct database
const Postgreph = async () => {
  await db
    .connect()
    .then(() => {
      console.log("Connect to database");
    })
    .catch((e) => {
      console.log(e);
    });
};
Postgreph();

//Route
app.use("/api", require("./routes/login"));
app.use("/api", require("./routes/logout"));
app.use("/api", require("./routes/customer/cus"));
app.use("/api", require("./routes/employee/employ"));
app.use("/api", require("./routes/product/product"));
app.use("/api", require("./routes/gift/gift"));
app.use("/api", require("./routes/phonenumber/phone"));
app.use("/api", require("./routes/table/table"));
app.use("/api", require("./routes/order/order"));

/*
http://localhost:3300
*/

//API
app.get("/", (req, res) => {
  res.send("Hello World");
});
