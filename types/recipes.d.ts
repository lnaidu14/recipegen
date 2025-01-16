export interface Recipe {
    name: string
    cuisine: string
    servings: number
    ingredients: Ingredient[]
}

export interface Ingredient {
    name: string
    quantity: string
}