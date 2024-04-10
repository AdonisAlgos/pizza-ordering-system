import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

// Connect to MongoDB
async function connectMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("pizzaSystem"); // Use your DB name
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

// User registration endpoint
app.post("/register", async (req, res) => {
  const { name, lastName, email, password, streetAddress, city, postcode } =
    req.body;

  // Basic validation
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
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
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

  // Send a simple token back (Note: In production, use a secure token strategy)
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

// Start the server
async function startServer() {
  await connectMongo();
  const port = process.env.PORT || 5100;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
