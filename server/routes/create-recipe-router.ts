import { Request, Response } from "express";


export const createRecipe = async (req: any, res: any) => {
    const { name, ingredients, cuisine, servings } = req.body
    console.log(name, ingredients, cuisine, servings)
    return res.json({ message: "Recipes endpoint hit" })
}
