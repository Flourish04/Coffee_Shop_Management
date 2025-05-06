const express = require("express");
const router = express.Router();
const db = require("../../db");

function formatPhoneNumber(phoneNumber) {
  // Remove any non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, "");
  if (cleaned.length === 10) {
    // Format phone number as 079-5758-758
    return cleaned.replace(/^(\d{3})(\d{4})(\d{3})$/, "$1-$2-$3");
  }
  return null;
}

router.post("/register", async (req, res) => {
  const {
    customer_name,
    customer_username,
    customer_password,
    customer_birthdate,
    customer_gender,
    customer_address,
    customer_phone_number,
  } = req.body;

  Format_phone = formatPhoneNumber(customer_phone_number);

  try {
    const result = await db.query(
      `Insert into customers
        (customer_name,
        customer_username,
        customer_password,
        customer_birthdate,
        customer_gender,
        customer_address,
        customer_phone_number )
        Values ($1, $2, $3, $4, $5, $6, $7) returning *`,
      [
        customer_name,
        customer_username,
        customer_password,
        customer_birthdate,
        customer_gender,
        customer_address,
        Format_phone,
      ]
    );

    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ mess: { error } });
  }
});

router.get('/customers', async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;

  // Calculate offset
  const offset = (page - 1) * limit;

  try {
    // Fetch total number of customers for pagination metadata
    const countResult = await db.query('SELECT COUNT(*) FROM customers WHERE customer_name ILIKE $1', [`%${search}%`]);
    const totalCustomers = parseInt(countResult.rows[0].count, 10);

    // Fetch customers with pagination
    const customersResult = await db.query(
      `
      SELECT
        customer_id,
        customer_name,
        customer_birthdate,
        customer_gender,
        customer_point
      FROM
        customers
      WHERE
        customer_name ILIKE $1
      ORDER BY
        customer_name ASC
      LIMIT $2 OFFSET $3
      `,
      [`%${search}%`, limit, offset]
    );

    // Return customers along with pagination metadata
    res.status(200).json({
      totalUsers: totalCustomers,
      totalPages: Math.ceil(totalCustomers / limit),
      currentPage: parseInt(page, 10),
      users: customersResult.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

router.get("/customers/top-spenders", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM classify_customers_by_spending() LIMIT 10");
    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ mess: { error } });
  }
});

router.get("/customers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("select * from customers where customer_id = $1", [id]);
    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ mess: { error } });
  }
});

router.delete('/customers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Kiểm tra xem khách hàng có tồn tại hay không
    const customer = await db.query(
      'SELECT customer_id FROM customers WHERE customer_id = $1',
      [id]
    );

    if (customer.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Xóa khách hàng
    await db.query('DELETE FROM customers WHERE customer_id = $1', [id]);

    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
});

module.exports = router;
