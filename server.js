const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("./models/User.model");
const PizzaModel = require("./models/Pizza.model");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const userToSend = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      streetAddress: user.streetAddress,
      city: user.city,
      postcode: user.postcode,
    };

    res.status(200).send({ message: "Login successful", user: userToSend });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
});

// Pizza retrieval endpoint
app.get("/pizzas", async (req, res) => {
  try {
    const pizzas = await PizzaModel.find({});
    res.status(200).json(pizzas);
  } catch (error) {
    console.error("Error retrieving pizzas:", error);
    res.status(500).json({ message: "Error retrieving pizzas" });
  }
});

// app.post("/pizza", async (req, res) => {
//   try {
//     const newPizza = new PizzaModel(req.body);

//     await newPizza.save();

//     res.status(201).send({ message: "Pizza created successfully" });
//   } catch (error) {
//     console.error("Error creating pizza:", error);
//     res.status(500).send({ message: "Error creating pizza" });
//   }
// });

// app.get("/orders", async (req, res) => {
//   const orders = await db
//     .collection("order")
//     .find({ status: "completed" })
//     .toArray();
//   res.status(200).send(orders);
// });

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
