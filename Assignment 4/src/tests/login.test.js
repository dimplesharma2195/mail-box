const request = require("supertest");
const app = require("../server");

describe("Login API", () => {
  test("returns 400 if email is missing", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ password: "password123" });
      
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Email is required");
  });

  test("returns 400 if password is missing", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: "user@example.com" });
      
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Password is required");
  });

  test("returns 200 and a token for valid login", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({
        email: "user@example.com",
        password: "password123",
      });
      
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.message).toBe("Login successful");
  });
});
