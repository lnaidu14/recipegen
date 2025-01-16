import { body } from 'express-validator'


export const recipeValidator = [body('name', 'Name of recipe is missing!').not().isEmpty().isString(), body('cuisine', 'Recipe type/cuisine not been specified!').not().isEmpty().isString(), body('servings', 'Number of people the recipe or dish serves is missing!').isNumeric(), body('ingredients.*.name', 'Name of ingredient is missing!').not().isEmpty().isString(), body('ingredients.*.quantity', 'Quantity of ingredient is missing!').not().isEmpty().isString(), body('steps', 'Steps are missing!').not().isEmpty().isString(),
]