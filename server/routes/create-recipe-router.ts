import { Request, Response } from "express";

export const createRecipe = async (req: Request, res: Response) => {
    const { name, ingredients, cuisine, servings } = req.body
    console.log(name, ingredients, cuisine, servings)
    res.json({ message: "Server is live..." })
}
