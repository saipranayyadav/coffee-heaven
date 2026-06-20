const mongoose = require("mongoose");

const orderSchema =
  new mongoose.Schema({

    customerName: String,

    phone: String,

    email: String,

    tableNumber: String,

    items: Array,

    totalPrice: Number,

    paymentMethod: String,

    status: {
      type: String,
      default: "Pending",
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

  });

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );