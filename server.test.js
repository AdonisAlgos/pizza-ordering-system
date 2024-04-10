import request from "supertest";
import { app } from "./server"; // Adjust the import path based on your file structure

describe("POST /register", () => {
  it("should return 400 for missing fields", async () => {
    const response = await request(app)
      .post("/register")
      .send({ name: "John" }); // Sending incomplete data

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "All fields are required");
  });

  it("should return 201 for successful registration", async () => {
    const response = await request(app).post("/register").send({
      name: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
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
    // Assuming there's already a user with this email in the test database
    const response = await request(app).post("/register").send({
      name: "John",
      lastName: "Smith",
      email: "john@example.com", // Assume this user already exists
      password: "password123",
      streetAddress: "123 Elm St",
      city: "Townsville",
      postcode: "54321",
    });

    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty("message", "User already exists");
  });
});
