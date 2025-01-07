import { health } from "./health-router"
import { createRecipe } from "./create-recipe-router"
import express from "express"

const router = express.Router()

router.use("/api", health)

router.use("/api/recipes", createRecipe)

export default router