const express = require("express");
const router = express.Router();
const db = require("../../db");

router.post("/tables", async (req, res) => {
  const { department_id } = req.body;

  try {
    const result = await db.query(
      `select table_id from tables  where table_department_id = $1`,
      [department_id]
    );
    return res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ mess: "Error uploading table" });
  }
});

module.exports = router;
