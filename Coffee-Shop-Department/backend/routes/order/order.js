const express = require("express");
const router = express.Router();
const db = require("../../db");

router.post("/order", async (req, res) => {
  const {
    department_id,
    phone,
    employeeId,
    tableId,
    quantityTotal,
    priceTotal,
    cart,
  } = req.body;

  try {
    const result = await db.query(
      "SELECT * from  handle_checkout($1, $2, $3, $4, $5, $6, $7)",
      [
        phone,
        department_id,
        employeeId,
        tableId,
        quantityTotal,
        priceTotal,
        JSON.stringify(cart),
      ]
    );
    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ mess: "Internal server error" });
  }
});

module.exports = router;
