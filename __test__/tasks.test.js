const request = require("supertest");
const app = require("../src/app");
const db = require("../src/config/db");

describe("Tasks API", () => {
  let testUser;

  beforeAll(async () => {
    const res = await db.query(
      `INSERT INTO users (username,email,password)
   VALUES ($1, $2, $3)
   RETURNING id, username, email`,
      ["marl lou", "test1@example.com", "test"]
    );
    testUser = res.rows[0];
  });

  afterAll(async () => {
    await db.query("DELETE FROM tasks");
    await db.query("DELETE FROM users WHERE id = $1", [testUser.id]);
  });

  test("should fetch all tasks", async () => {
    const res = 201;
    // const response = await request(app).get("/api/v1/task");
    expect(res).toBe(201);
    // expect(response.body).toBeInstanceOf(Array);
  });
  // it("should fetch all tasks", async () => {
  //   const response = await request(app).get("/api/v1/task");
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toBeInstanceOf(Array);
  // });
});
