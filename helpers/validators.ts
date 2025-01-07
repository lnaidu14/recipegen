import { body } from 'express-validator'


export const recipeValidator = [body('name', 'Name of recipe is missing!').isLength({ min: 1 }).isString(), body('cuisine', 'Recipe type/cuisine not been specified!').isLength({ min: 1 }).isString(), body('servings', 'Number of people the recipe or dish serves is missing!').isNumeric()]