const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

/* Place Order */
router.post("/place", async (req, res) => {
  try {

    const order = new Order(req.body);

    await order.save();

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

/* Get All Orders */
router.get("/all", async (req, res) => {
  try {

    const orders =
      await Order.find().sort({
        createdAt: -1,
      });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

/* Update Order Status */
router.put("/status/:id", async (req, res) => {
  try {

    const updateData = {
      status: req.body.status,
    };

    if (
      req.body.status === "Served"
    ) {

      updateData.isCompleted = true;

    }

    const updated =
      await Order.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
        }
      );

    res.json(updated);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

/* Active Orders */
router.get("/active", async (req, res) => {
  try {

    const orders =
      await Order.find({
        isCompleted: false,
      }).sort({
        createdAt: -1,
      });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

/* Today's Orders */
router.get("/today", async (req, res) => {
  try {

    const orders =
      await Order.find({
        isCompleted: true,
      }).sort({
        createdAt: -1,
      });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;