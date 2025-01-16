import { health } from "./health-router"
import { createRecipe } from "./create-recipe-router"
import express from "express"
import { recipeValidator } from "../../helpers/validators"
import { validationResult } from 'express-validator'

const router = express.Router()

router.get("/", health)

router.post("/recipes", recipeValidator, (req: any, res: any, next: express.NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        // in case request params meet the validation criteria
        return createRecipe(req, res, next)
    }
    return res.status(422).json(errors.array().map(error => error.msg))
})

export default router