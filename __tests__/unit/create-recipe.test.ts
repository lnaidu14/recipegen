import request from "supertest"
import router from "../../server/app"

describe("Create recipe", () => {
    it(`should throw an error if name of recipe is missing`, async () => {
        const response = await request(router).post("/api/recipes")
        expect(response.body.message).toEqual("Name of recipe is missing!")
    })
    it(`should throw an error if ingredients in recipe are missing`, async () => {
        const response = await request(router).post("/api/recipes")
        expect(response.body.message).toEqual("Ingredients are missing!")
    })

    it(`should throw an error if an ingredient name is missing`, async () => {
        const response = await request(router).post("/api/recipes")
        expect(response.body.message).toEqual("Name for ingredient #1 missing")
    })

    it(`should throw an error if an ingredient quantity is missing`, async () => {
        const response = await request(router).post("/api/recipes")
        expect(response.body.message).toEqual(`Quantity for ingredient #1 missing`)
    })

    it(`should throw an error if type/cuisine of recipe is missing`, async () => {
        const response = await request(router).post("/api/recipes")
        expect(response.body.message).toEqual(`Type of recipe has not been specified`)
    })

    it(`should throw an error if number of servings is missing`, async () => {
        const response = await request(router).post("/api/recipes")
        expect(response.body.message).toEqual(`Number of people the recipe or dish serves is missing`)
    })
})