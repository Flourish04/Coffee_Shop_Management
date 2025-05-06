const express = require("express");
const router = express.Router();
const db = require('../../db');

router.get("/products/top-selling", async (req, res) => {
    const { category, limit = 10 } = req.query;
  
    try {
      let query = `
        SELECT 
          p.product_category,
          p.product_name,
          SUM(oi.order_item_quantity) AS total_sold,
          SUM(oi.order_item_price * oi.order_item_quantity) AS total_revenue
        FROM 
          order_items oi
        JOIN 
          products p ON oi.order_item_product_id = p.product_id
        GROUP BY 
          p.product_category, p.product_name
        ORDER BY 
          total_sold DESC
        LIMIT $1
      `;
  
      const queryParams = [parseInt(limit, 10)];
  
      if (category) {
        query = `
          SELECT 
            p.product_category,
            p.product_name,
            SUM(oi.order_item_quantity) AS total_sold,
            SUM(oi.order_item_price * oi.order_item_quantity) AS total_revenue
          FROM 
            order_items oi
          JOIN 
            products p ON oi.order_item_product_id = p.product_id
          WHERE 
            p.product_category ILIKE $1
          GROUP BY 
            p.product_category, p.product_name
          ORDER BY 
            total_sold DESC
          LIMIT $2
        `;
        queryParams.unshift(category); 
      }
  
      const result = await db.query(query, queryParams);
  
      res.status(200).json({
        category: category || "All Categories",
        limit,
        topSellingProducts: result.rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch top-selling products" });
    }
});

router.get("/products/filter", async (req, res) => {
    const { 
        product_name, 
        product_rating, 
        product_category, 
        min_price, 
        max_price 
    } = req.query;

    let query = "SELECT * FROM products WHERE 1=1"; 
    const queryParams = [];

    try {
        if (product_name) {
            queryParams.push(`%${product_name}%`);
            query += ` AND product_name ILIKE $${queryParams.length}`;
        }
        if (product_rating) {
            const rating = parseFloat(product_rating);
            if (isNaN(rating)) throw new Error("Invalid product_rating value");
            queryParams.push(rating);
            query += ` AND product_rating = $${queryParams.length}`;
        }
        if (product_category) {
            queryParams.push(`%${product_category}%`);
            query += ` AND product_category ILIKE $${queryParams.length}`;
        }
        if (min_price) {
            const min = parseFloat(min_price);
            if (isNaN(min)) throw new Error("Invalid min_price value");
            queryParams.push(min);
            query += ` AND product_unit_price >= $${queryParams.length}`;
        }
        if (max_price) {
            const max = parseFloat(max_price);
            if (isNaN(max)) throw new Error("Invalid max_price value");
            queryParams.push(max);
            query += ` AND product_unit_price <= $${queryParams.length}`;
        }

        const result = await db.query(query, queryParams);
        res.json(result.rows);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/products", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM products");
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query("SELECT * FROM products WHERE product_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).send("Product not found");
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/products", async (req, res) => {
    const {
        product_category,
        product_type,
        product_name,
        product_description,
        product_rating,
        product_unit_price,
        product_image,
        product_discount,
    } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO products 
                (product_category, 
                product_type, 
                product_name,
                product_description,
                product_rating,
                product_unit_price,
                product_image,
                product_discount) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [
                product_category,
                product_type,
                product_name,
                product_description,
                product_rating,
                product_unit_price,
                product_image,
                product_discount,
            ]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

router.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const {
        product_category,
        product_type,
        product_name,
        product_description,
        product_rating,
        product_unit_price,
        product_image,
        product_discount,
    } = req.body;

    try {
        const result = await db.query(
            `UPDATE products SET 
                product_category = $1,
                product_type = $2,
                product_name = $3,
                product_description = $4,
                product_rating = $5,
                product_unit_price = $6,
                product_image = $7,
                product_discount = $8
            WHERE product_id = $9 RETURNING *`,
            [
                product_category,
                product_type,
                product_name,
                product_description,
                product_rating,
                product_unit_price,
                product_image,
                product_discount,
                id
            ]);
        if (result.rows.length === 0) {
            return res.status(404).send("Product not found");
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query("DELETE FROM products WHERE product_id = $1 RETURNING *", [id]);
        if (result.rowCount === 0) {
            return res.status(404).send("Product not found");
        }
        res.json({ message: "Product deleted", product: result.rows[0] });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;