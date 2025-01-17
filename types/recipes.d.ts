export interface Recipe {
    name: string
    cuisine: string
    servings: number
    ingredients: Ingredient[]
    verified: boolean
    // Make each step '.' separated
    steps: string
    authour: string
    created_at: string
    updated_at: string
}

export interface Ingredient {
    name: string
    quantity: string
}