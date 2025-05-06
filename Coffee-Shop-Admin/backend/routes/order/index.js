const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/orders', async (req, res) => {
  const {
    page = 1,
    limit = 10, // Default limit
  } = req.query;

  // Calculate offset
  const offset = (page - 1) * limit;

  try {
    // Fetch total number of orders for pagination metadata
    const countResult = await db.query('SELECT COUNT(*) FROM orders');
    const totalOrders = parseInt(countResult.rows[0].count, 10);

    // Fetch orders with pagination
    const ordersResult = await db.query(
      `
      SELECT
        o.order_id,
        o.order_transaction_date,
        o.order_transaction_time,
        o.order_total_quantity,
        o.order_total_price,
        o.order_department_id,
        o.order_employee_id,
        o.order_customer_id
      FROM
        orders o
      ORDER BY
        o.order_transaction_date DESC,
        o.order_transaction_time DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    );

    // Return orders along with pagination metadata
    res.status(200).json({
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: parseInt(page, 10),
      orders: ordersResult.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.get('/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM display_order_bill($1)`;
    const result = await db.query(query, [id]);
    if(result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(result.rows);
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
})

module.exports = router;