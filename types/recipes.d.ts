export interface Recipe {
    name: string
    cuisine: string
    servings: number
    ingredients: Ingredient[]
    verified: boolean,
    // Make each step '.' separated
    steps: string
}

export interface Ingredient {
    name: string
    quantity: string
}