import { health } from "./health-router"
import { getAllRecipes } from "./get-all-recipe-router"
import { createRecipe } from "./create-recipe-router"
import express from "express"
import { recipeValidator } from "../../helpers/validators"
import { validationResult } from 'express-validator'

const router = express.Router()

router.get("/", health)

router.post("/recipes", recipeValidator, async (req: any, res: any, next: express.NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        // in case request params meet the validation criteria
        try {
            const createdRecipe = await createRecipe(req, res, next)
            return res.status(201).json({ message: "Successfully created recipe!", recipe: createdRecipe });
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" })
        }

    }
    return res.status(422).json(errors.array().map(error => error.msg))
})

router.get("/recipes", async (req: any, res: any, next: express.NextFunction) => {
    try {
        const fetchedRecipes = await getAllRecipes(req, res, next)
        return res.status(200).json({ message: "Successfully fetched recipes!", recipes: fetchedRecipes });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

export default router