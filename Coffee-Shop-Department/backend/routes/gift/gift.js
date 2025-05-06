const express = require("express");
const router = express.Router();
const db = require("../../db");

//Get All Product
router.get("/gifts", async (req, res) => {
  try {
    const results = await db.query("select * from gifts ");
    return res.status(200).send(results.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ mess: "Failed to fetch products" });
  }
});

router.post("/exchange-gift", async (req, res) => {
  const { phone_number, gift_id, gift_point, quantity } = req.body;

  try {
    const result = await db.query(
      "select * from exchange_gift($1, $2, $3, $4)",
      [phone_number, gift_id, gift_point, quantity]
    );

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
