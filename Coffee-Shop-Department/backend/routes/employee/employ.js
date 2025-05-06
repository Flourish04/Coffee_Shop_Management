const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/employees", async (req, res) => {
  const {
    department_id,
    name,
    position,
    sort_by,
    order,
    page = 1,
    limit = 10,
  } = req.query;

  //Default query
  let query = "Select * from employees where true";
  let values = [];
  let count = 0;

  if (department_id) {
    count++;
    query += ` AND employee_department_id = $${count}`;
    values.push(department_id);
  }

  if (name) {
    count++;
    query += ` AND (employee_first_name ILIKE $${count} OR employee_last_name ILIKE $${count})`;
    values.push(`%${name}%`);
  }

  if (position) {
    count++;
    query += ` AND employee_position ILIKE $${count}`;
    values.push(`%${position}%`);
  }

  // Add sorting based on query parameters
  if (sort_by && order) {
    query += ` Order by ${sort_by}  ${order}`;
  } else {
    query += " order by employee_id asc"; // default sorting by employee_id ascending
  }

  // Default page 1, limit 10

  //   const offset = (page - 1) * limit;
  //   query += ` LIMIT $${++count} OFFSET $${++count}`;
  //   values.push(limit, offset);

  try {
    const result = await db.query(query, values);

    return res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
