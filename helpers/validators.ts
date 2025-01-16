import { body } from 'express-validator'


export const recipeValidator = [body('name', 'Name of recipe is missing!').isLength({ min: 1 }).not().isEmpty().isString(), body('cuisine', 'Recipe type/cuisine not been specified!').not().isEmpty().isString(), body('servings', 'Number of people the recipe or dish serves is missing!').isNumeric(), body('ingredients.*.name').not().isEmpty().isString(), body('ingredients.*.quantity').not().isEmpty().isString()
]