const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const Departquery =
      "Select * from departments where department_username = $1 AND department_password = $2 ";
    const { rows } = await db.query(Departquery, [username, password]);
    if (rows.length === 0) {
      return res.status(401).send({ mess: "Invalid user" });
    }
    const user = rows[0];
    res.status(200).send({ mess: "Login sucessful", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ mess: "Internal server error" });
  }
});

module.exports = router;
