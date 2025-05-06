const express = require('express');
const db = require('../../db');
const router = express.Router();

router.get('/gifts/ranking', async (req, res) => {
    const { start_date, end_date } = req.query;
    
    try {
        const query = `SELECT * FROM get_gift_rankings($1, $2)`;
        const result = await db.query(query, [start_date, end_date]);
        return res.json(result.rows);
    } catch(error) {
        console.error(error);
        res.status(500).json({error: 'Failed to fetch gifts ranking'});
    }
})

module.exports = router;