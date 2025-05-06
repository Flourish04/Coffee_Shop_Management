const express = require("express");
const router = express.Router();
const db = require("../../db");

router.post("/check-phone", async (req, res) => {
  const { phone_number } = req.body;

  try {
    const result = await db.query("select * from check_customer_phone($1)", [
      phone_number,
    ]);

    if (result.rows.length > 0) {
      return res.status(200).send(result.rows[0]);
    } else {
      return res.status(400).send({ mess: "No data returned from function" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ mess: "Internal server error" });
  }
});

module.exports = router;
