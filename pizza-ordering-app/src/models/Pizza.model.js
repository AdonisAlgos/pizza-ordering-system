import { Schema, model } from "mongoose";

const pizzaSchema = new Schema({
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

const PizzaModel = model("Pizza", pizzaSchema);

export default PizzaModel;
