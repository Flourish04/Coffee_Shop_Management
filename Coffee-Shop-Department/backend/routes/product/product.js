const express = require("express");
const router = express.Router();
const db = require("../../db");

// Multer
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Set up Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload files
router.post("/products", upload.single("productImage"), async (req, res) => {
  const {
    productCategory,
    productType,
    productName,
    productDescription,
    productRating,
    productUnitPrice,
    productDiscount,
    productState,
  } = req.body;

  const productImage = req.file ? req.file.buffer : null;

  try {
    const result = await db.query(
      `INSERT INTO products (product_category, product_type, product_name, product_description, product_rating, product_unit_price, product_image, product_discount, product_state)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING product_id`,
      [
        productCategory,
        productType,
        productName,
        productDescription,
        productRating,
        productUnitPrice,
        productImage,
        productDiscount,
        productState,
      ]
    );
    return res.status(200).send({ mess: "Uploading Sucess" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ mess: "Error uploading product" });
  }
});

//Get All Product
router.get("/products", async (req, res) => {
  try {
    const result = await db.query(
      "select * from products where product_state = 'available' "
    );
    const productsWithBase64Images = result.rows.map((product) => {
      if (product.product_image) {
        // Convert Buffer to Base64 string
        product.product_image = product.product_image.toString("base64");
      }
      return product;
    });

    console.log(productsWithBase64Images);

    return res.status(200).send(productsWithBase64Images);
  } catch (error) {
    console.log(error);
    res.status(500).send({ mess: "Failed to fetch products" });
  }
});

// Get detail product
router.get("/product/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await db.query(
      "select * from products where product_id = $1",
      [productId]
    );

    if (result.rows.length === 0) {
      return res.status(400).send({ message: "Product not found" });
    }
    result.rows[0].product_image =
      result.rows[0].product_image.toString("base64");

    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.detail });
  }
});

router.put("/product/:id", async (req, res) => {
  const product_id = req.params.id;
  const { product_state } = req.body;

  try {
    const query = `
    update products
    set product_state = $1
    where product_id = $2
    returning product_state  
    `;

    const values = [product_state, product_id];
    const results = await db.query(query, values);

    if (results.rows.length == 0) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(results.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ messgae: error.detail });
  }
});

module.exports = router;
