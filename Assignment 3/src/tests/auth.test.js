const request = require("supertest");
const app = require("../server");

describe("Signup API", () => {
  test("should return 400 if email is missing", async () => {
    const response = await request(app).post("/api/signup").send({
      password: "password123",
      confirmPassword: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Email is required");
  });

  test("should return 400 if passwords do not match", async () => {
    const response = await request(app).post("/api/signup").send({
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password456",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Passwords do not match");
  });

  test("should return 201 on successful signup", async () => {
    const response = await request(app).post("/api/signup").send({
      email: "newuser@example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User successfully created");
  });
});
