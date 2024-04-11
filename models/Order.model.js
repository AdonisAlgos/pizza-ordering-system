const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pizzas: [
      {
        pizza: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pizza",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Placed", "Baked", "Delivered"],
      default: "Placed",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
