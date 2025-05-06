const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get("/revenue", async (req, res) => {
    const { start_date, end_date, department_id } = req.query;
    try {
        const query = `SELECT * FROM calculate_total_revenue($1, $2, $3)`;

        const result = await db.query(query, [start_date, end_date, department_id || null]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;