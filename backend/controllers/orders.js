const { pool } = require("../models/db");

const createNewOrder = (req, res) => {
  const { carts_id, user_id } = req.body;
  const userId = req.token.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: `this is token ${userId}`,
    });
  }
  pool
    .query(
      `INSERT INTO orders (carts_id, user_id) VALUES ($1, $2) RETURNING *`,
      [carts_id, user_id]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Orders created successfully",
        orders: result.rows[0],
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: error.message,
      });
    });
};

module.exports = { createNewOrder };