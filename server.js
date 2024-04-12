const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("./models/User.model");
const PizzaModel = require("./models/Pizza.model");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());

// Connect to MongoDB using Mongoose
async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB with Mongoose");
  } catch (err) {
    console.error("Failed to connect to MongoDB with Mongoose:", err);
    process.exit(1);
  }
}

// User registration endpoint
app.post("/register", async (req, res) => {
  const { name, lastName, email, password, streetAddress, city, postcode } =
    req.body;

  if (
    !name ||
    !lastName ||
    !email ||
    !password ||
    !streetAddress ||
    !city ||
    !postcode
  ) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      lastName,
      email,
      password: hashedPassword,
      streetAddress,
      city,
      postcode,
    });

    await newUser.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
});

// User authentication endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await db.collection("customer").findOne({ username, password });

  if (!user) {
    return res.status(401).send({ message: "Invalid credentials" });
  }

  res.status(200).send({ token: "fake-token-for-" + username });
});

// Pizza retrieval endpoint
app.get("/pizzas", async (req, res) => {
  try {
    const pizzas = await PizzaModel.find({});
    res.status(200).json(pizzas); // It's a good practice to use res.json() to send JSON responses
  } catch (error) {
    console.error("Error retrieving pizzas:", error);
    res.status(500).json({ message: "Error retrieving pizzas" });
  }
});

app.post("/pizza", async (req, res) => {
  try {
    // Create a new pizza using the PizzaModel
    const newPizza = new PizzaModel(req.body);

    // Save the pizza to the database
    await newPizza.save();

    // Send a success response
    res.status(201).send({ message: "Pizza created successfully" });
  } catch (error) {
    // Handle potential errors
    console.error("Error creating pizza:", error);
    res.status(500).send({ message: "Error creating pizza" });
  }
});

// Completed orders retrieval endpoint
app.get("/orders", async (req, res) => {
  const orders = await db
    .collection("order")
    .find({ status: "completed" })
    .toArray();
  res.status(200).send(orders);
});

// Function to start the server
async function startServer() {
  await connectMongo();
  const port = 5100;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
