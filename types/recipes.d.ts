export interface Recipe {
    id: any | string
    name: string
    cuisine: string
    servings: number
    ingredients: Ingredient[]
    verified: boolean
    // Make each step '.' separated
    steps: string
    authour: string
    created_at: any | string
    updated_at: string | string
}

export interface Ingredient {
    name: string
    quantity: string
}