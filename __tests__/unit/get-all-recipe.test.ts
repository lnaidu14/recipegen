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

describe("getting all recipes", () => {
    let pool: any;
    // before each test case
    beforeEach(() => {
        pool = new Pool();
    });
    // clean up after each test case done
    afterEach(() => {
        jest.clearAllMocks();
    });

    it(`should return an empty array if there are no recipes`, async () => {
        pool.query.mockResolvedValue({
            rows: []
        });

        const response = await request(router).get("/api/recipes")
        expect(response.body.message).toEqual(`Successfully fetched recipes!`)
        expect(response.body.recipes).toEqual([])
        expect(response.status).toEqual(200)
    })

    it(`should return an internal server error for server side fetching errors in database`, async () => {
        pool.query.mockImplementationOnce(() => {
            throw new Error()
        })

        const response = await request(router).get("/api/recipes")
        expect(response.body.message).toEqual(`Internal Server Error`)
        expect(response.status).toEqual(500)
    })

    it(`should successfully fetch all recipes`, async () => {
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

        const response = await request(router).get("/api/recipes")
        expect(response.body.message).toEqual(`Successfully fetched recipes!`)
        expect(response.status).toEqual(200)
        expect(response.body.recipes[0].authour).toEqual(`Lalit`)
        expect(response.body.recipes[0].cuisine).toEqual(`Indian`)
        expect(response.body.recipes[0].ingredients[0].name).toEqual(`Tomato`)
        expect(response.body.recipes[0].ingredients[0].quantity).toEqual(`100gm`)
        expect(response.body.recipes[0].name).toEqual(`Tomato Soup`)
        expect(response.body.recipes[0].servings).toEqual(2)
        expect(response.body.recipes[0].steps).toEqual("Boil tomatoes. Quick cool in ice bath. Blend tomatoes. Cook blended tomatoes and add seasoning and water.")
        expect(response.body.recipes[0].verified).toEqual(false)
    })
})