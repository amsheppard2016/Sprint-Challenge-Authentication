const server = require("../api/server");
const db = require("../database/dbConfig");
const request = require("supertest");

describe("auth-router.js", () => {
    test("should be the testing environment", () => {
        expect(process.env.DB_ENV).toBe("testing");
    });

    describe("post /register", () => {
        const registerUser = { username: "username2", password: "password2" };

        it("should return 201 status", async () => {
            const res = await request(server)
                .post("/api/auth/register")
                .send(registerUser);
            expect(res.status).toBe(201);
        });
        const registerUser2 = { username: "username3", password: "password3" };

        it("should return username ", async () => {
            const res = await request(server)
                .post("/api/auth/register")
                .send(registerUser2);
            expect(res.body.username).toEqual(registerUser2.username);
        });

        beforeEach(async () => {
            await db("users").truncate();
        });
    });
    describe("post /login", () => {
        const user = { username: "username2", password: "password2" };

        it("should return 200 status", async () => {
            const res = await request(server)
                .post("/api/auth/login")
                .send(user);
            expect(200);
        });

        const nonUser = { username: "user124", password: "pass" };
        it("should return 401 status", async () => {
            const res = await request(server)
                .post("/api/auth/login")
                .send(nonUser);
            expect(res.status).toBe(401);
        });

        beforeEach(async () => {
            await db("users").truncate();
        });
    });
});
