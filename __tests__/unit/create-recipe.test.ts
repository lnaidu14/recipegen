import request from "supertest"
import router from "../../server/app"

describe("Create recipe", () => {
    it(`should throw an error if name of recipe is missing`, async () => {
        const response = await request(router).post("/api/recipes").send({
            "name": "",
            "ingredients": [
                {
                    "name": "tomato",
                    "quantity": "100gm"

                }

            ],
            "cuisine": "Indian",
            "servings": 2

        }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        console.log("response: ", response.body)
        expect(response.body[0]).toEqual("Name of recipe is missing!")
    })
    it.skip(`should throw an error if ingredients in recipe are missing`, async () => {
        const response = await request(router).post("/api/recipes").send({
            "name": "tomato",
            "ingredients": [],
            "cuisine": "Indian",
            "servings": 2

        }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(response.body[0]).toEqual("Ingredients are missing!")
    })

    it.skip(`should throw an error if an ingredient name is missing`, async () => {
        const response = await request(router).post("/api/recipes")
        expect(response.body[0]).toEqual("Name for ingredient #1 missing")
    })

    it.skip(`should throw an error if an ingredient quantity is missing`, async () => {
        const response = await request(router).post("/api/recipes")
        expect(response.body[0]).toEqual(`Quantity for ingredient #1 missing`)
    })

    it(`should throw an error if type/cuisine of recipe is missing`, async () => {
        const response = await request(router).post("/api/recipes").send({
            "name": "tomato",
            "ingredients": [
                {
                    "name": "tomato",
                    "quantity": "100gm"
                }
            ],
            "cuisine": "",
            "servings": 2

        }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(response.body[0]).toEqual(`Recipe type/cuisine not been specified!`)
    })

    it(`should throw an error if number of servings is missing`, async () => {
        const response = await request(router).post("/api/recipes").send({
            "name": "tomato",
            "ingredients": [
                {
                    "name": "tomato",
                    "quantity": "100gm"
                }
            ],
            "cuisine": "Indian",
            "servings": null

        }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(response.body[0]).toEqual(`Number of people the recipe or dish serves is missing!`)
    })
})