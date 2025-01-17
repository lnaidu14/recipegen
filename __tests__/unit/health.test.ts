import request from "supertest"
import { app as router } from "../../server/app"

describe("Health Check", () => {
    it(`should respond with "Server is live..."`, async () => {
        const response = await request(router).get("/api")
        expect(response.body.message).toEqual("Server is live...")
    })
})