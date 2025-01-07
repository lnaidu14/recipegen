import { body } from 'express-validator'


export const recipeValidator = [body('name', 'Name is required.').isLength({ min: 1 }).isString(), body('cuisine', 'Cuisine is required.').isLength({ min: 1 }).isString(), body('servings', 'Number of servings is required.').isNumeric()]