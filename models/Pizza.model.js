const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  sizes: [
    {
      size: {
        type: String,
        required: true,
        enum: ["Small", "Medium", "Large"], // You can adjust the sizes as needed
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

const PizzaModel = mongoose.model("pizza", pizzaSchema);

module.exports = PizzaModel;
