import request from "supertest"
import { app as router } from "../../server/app"
import { Pool } from "pg"

// setup for to mock pg
jest.mock('pg', () => {
    const mPool = {
        connect: function () {
            return { query: jest.fn() };
        },
        query: jest.fn(),
        end: jest.fn(),
        on: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
});

describe("given recipe parameters", () => {
    let pool: any;
    // before each test case
    beforeEach(() => {
        pool = new Pool();
    });
    // clean up after each test case done
    afterEach(() => {
        jest.clearAllMocks();
    });
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
            "servings": 2,
            "steps": "Boil tomatoes. Quick cool in ice bath. Blend tomatoes. Cook blended tomatoes and add seasoning and water.",
            "authour": "Lalit"

        }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(response.body[0]).toEqual("Name of recipe is missing!")
        expect(response.status).toEqual(422)

    })

    it(`should throw an error if an ingredient name is missing`, async () => {
        const response = await request(router).post("/api/recipes").send({
            "name": "Tomato Soup",
            "ingredients": [
                {
                    "name": "",
                    "quantity": "100gm"
                }
            ],
            "cuisine": "Indian",
            "servings": 2,
            "steps": "Boil tomatoes. Quick cool in ice bath. Blend tomatoes. Cook blended tomatoes and add seasoning and water.",
            "authour": "Lalit"
        }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(response.body).toContain("Name of ingredient is missing!")
        expect(response.status).toEqual(422)

    })

    it(`should throw an error if an ingredient quantity is missing`, async () => {
        const response = await request(router).post("/api/recipes").send({
            "name": "Tomato Soup",
            "ingredients": [
                {
                    "name": "tomato",
                    "quantity": ""
                }
            ],
            "cuisine": "Indian",
            "servings": 2,
            "steps": "Boil tomatoes. Quick cool in ice bath. Blend tomatoes. Cook blended tomatoes and add seasoning and water.",
            "authour": "Lalit"
        }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(response.body[0]).toEqual(`Quantity of ingredient is missing!`)
        expect(response.status).toEqual(422)

    })

    it(`should throw an error if type/cuisine of recipe is missing`, async () => {
        const response = await request(router).post("/api/recipes").send({
            "name": "Tomato Soup",
            "ingredients": [
                {
                    "name": "tomato",
                    "quantity": "100gm"
                }
            ],
            "cuisine": "",
            "servings": 2,
            "steps": "Boil tomatoes. Quick cool in ice bath. Blend tomatoes. Cook blended tomatoes and add seasoning and water.",
            "authour": "Lalit"
        }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(response.body).toContain(`Recipe type/cuisine not been specified!`)
        expect(response.status).toEqual(422)

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
            "servings": "",
            "steps": "Boil tomatoes. Quick cool in ice bath. Blend tomatoes. Cook blended tomatoes and add seasoning and water.",
            "authour": "Lalit"
        }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(response.body).toContain(`Number of people the recipe or dish serves is missing!`)
        expect(response.status).toEqual(422)

    })

    it(`should throw an error if steps are missing `, async () => {
        const response = await request(router).post("/api/recipes").send({
            "name": "tomato",
            "ingredients": [
                {
                    "name": "tomato",
                    "quantity": "100gm"
                }
            ],
            "cuisine": "Indian",
            "servings": 2,
            "steps": "",
            "authour": "Lalit"

        }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(response.body).toContain(`Steps are missing!`)
        expect(response.status).toEqual(422)

    })

    it(`should throw an error if authour is missing `, async () => {
        const response = await request(router).post("/api/recipes").send({
            "name": "tomato",
            "ingredients": [
                {
                    "name": "tomato",
                    "quantity": "100gm"
                }
            ],
            "cuisine": "Indian",
            "servings": 2,
            "steps": "Boil tomatoes. Quick cool in ice bath. Blend tomatoes. Cook blended tomatoes and add seasoning and water.",
            "authour": ""

        }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(response.body).toContain(`Authour needs to be added!`)
    })

    it(`should throw an error if error occured when creating in database`, async () => {
        pool.query.mockResolvedValue(null);
        const response = await request(router).post("/api/recipes").send({
            name: "Tomato Soup",
            ingredients: [
                {
                    name: "Tomato",
                    quantity: "100gm"
                }
            ],
            cuisine: "Indian",
            servings: 2,
            steps: "Boil tomatoes. Quick cool in ice bath. Blend tomatoes. Cook blended tomatoes and add seasoning and water.",
            authour: "Lalit"

        }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        console.log("response: ", response.body)
        expect(response.body.message).toEqual("Internal Server Error")
        expect(response.status).toEqual(500)
    })

    it(`should successfully create a recipe`, async () => {
        pool.query.mockResolvedValue({
            rows: [{
                name: 'Tomato Soup',
                cuisine: 'Indian',
                servings: 2,
                ingredients: [{
                    "name": "Tomato",
                    "quantity": "100gm"
                }],
                steps: 'Boil tomatoes. Quick cool in ice bath. Blend tomatoes. Cook blended tomatoes and add seasoning and water.',
                verified: false,
                authour: 'Lalit',
            }]
        });

        const response = await request(router).post("/api/recipes").send({
            name: "Tomato Soup",
            ingredients: [
                {
                    name: "Tomato",
                    quantity: "100gm"
                }
            ],
            cuisine: "Indian",
            servings: 2,
            steps: "Boil tomatoes. Quick cool in ice bath. Blend tomatoes. Cook blended tomatoes and add seasoning and water.",
            authour: "Lalit"

        }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(response.status).toEqual(201)
        expect(response.body.message).toEqual(`Successfully created recipe!`)
        expect(response.body.recipe.authour).toEqual(`Lalit`)
        expect(response.body.recipe.cuisine).toEqual(`Indian`)
        expect(response.body.recipe.ingredients[0].name).toEqual(`Tomato`)
        expect(response.body.recipe.ingredients[0].quantity).toEqual(`100gm`)
        expect(response.body.recipe.name).toEqual(`Tomato Soup`)
        expect(response.body.recipe.servings).toEqual(2)
        expect(response.body.recipe.steps).toEqual("Boil tomatoes. Quick cool in ice bath. Blend tomatoes. Cook blended tomatoes and add seasoning and water.")
        expect(response.body.recipe.verified).toEqual(false)
    })
})