const request = require("supertest");
const { app } = require("./server");
const mongoose = require("mongoose");
const UserModel = require("./models/User.model");
const dotenv = require("dotenv");

dotenv.config();

// Setup a test database connection
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clean up the database between tests
afterEach(async () => {
  await UserModel.deleteMany();
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Registration", () => {
  it("should return 400 for missing fields", async () => {
    const response = await request(app)
      .post("/register")
      .send({ name: "Test" }); // Incomplete data for testing

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "All fields are required");
  });

  test("It should register a new user", async () => {
    const newUser = {
      name: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      streetAddress: "123 Main St",
      city: "Anytown",
      postcode: "12345",
    };

    const response = await request(app).post("/register").send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User registered successfully"
    );

    // Verify that the user is in the database
    const user = await UserModel.findOne({ email: newUser.email });
    expect(user).not.toBeNull();
    expect(user.name).toBe(newUser.name);
  });

  test("It should not register a user with an existing email", async () => {
    const user = new UserModel({
      name: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      password: "password123",
      streetAddress: "124 Main St",
      city: "Anytown",
      postcode: "12345",
    });
    await user.save();

    const newUser = {
      name: "Jane",
      lastName: "Smith",
      email: "jane.doe@example.com", // Same email as the user above
      password: "password1234",
      streetAddress: "125 Main St",
      city: "Othertown",
      postcode: "54321",
    };

    const response = await request(app).post("/register").send(newUser);

    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty("message", "User already exists");
  });

  test("It should create pizza", async () => {
    const newPizza = {
      name: "Pawaiian",
      ingredients: ["Tomato Sauce", "Mozzarella Cheese", "Ham", "Pineapple"],
      sizes: [
        { size: "Small", price: 5.99 },
        { size: "Medium", price: 7.99 },
        { size: "Large", price: 9.99 },
      ],
    };

    const response = await request(app).post("/pizza").send(newPizza);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Pizza created successfully"
    );
  });
  // Add more tests as needed for different scenarios
});
