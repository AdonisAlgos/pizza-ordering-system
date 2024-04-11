const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("./models/User.model"); // Adjust this path if necessary
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

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
  const user = await db.collection("users").findOne({ username, password });

  if (!user) {
    return res.status(401).send({ message: "Invalid credentials" });
  }

  res.status(200).send({ token: "fake-token-for-" + username });
});

// Pizza retrieval endpoint
app.get("/pizzas", async (req, res) => {
  const pizzas = await db.collection("pizzas").find({}).toArray();
  res.status(200).send(pizzas);
});

// Completed orders retrieval endpoint
app.get("/orders", async (req, res) => {
  const orders = await db
    .collection("orders")
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
