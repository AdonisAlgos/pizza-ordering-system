import request from "supertest";
import { app } from "./server"; // Adjust the import path based on your file structure
import UserModel from "../models/User.model";

describe("POST /register", () => {
  afterEach(async () => {
    // Delete only the test user to avoid affecting other data
    await UserModel.deleteMany({ email: /.*test@example\.com$/ });
  });

  it("should return 400 for missing fields", async () => {
    const response = await request(app)
      .post("/register")
      .send({ name: "Test" }); // Incomplete data for testing

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "All fields are required");
  });

  it("should return 201 for successful registration", async () => {
    const testEmail = "jane.doe.test@example.com"; // Use a specific pattern for test emails
    const response = await request(app).post("/register").send({
      name: "Jane",
      lastName: "Doe",
      email: testEmail,
      password: "123456",
      streetAddress: "123 Main St",
      city: "Anytown",
      postcode: "12345",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User registered successfully"
    );
  });

  it("should return 409 for duplicate email", async () => {
    const testEmail = "john.doe.test@example.com";
    // Create a user for the duplicate check
    await request(app).post("/register").send({
      name: "John",
      lastName: "Doe",
      email: testEmail,
      password: "password123",
      streetAddress: "456 Elm St",
      city: "Townsville",
      postcode: "54321",
    });

    // Attempt to create the same user again
    const response = await request(app).post("/register").send({
      name: "John",
      lastName: "Doe",
      email: testEmail, // Same email to trigger the duplicate error
      password: "password123",
      streetAddress: "456 Elm St",
      city: "Townsville",
      postcode: "54321",
    });

    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty("message", "User already exists");
  });
});
