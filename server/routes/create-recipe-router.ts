import { Request, Response, NextFunction } from "express";
import { pool } from "../../db/pg"

export const createRecipe = async (req: Request, res: Response, next: NextFunction) => {
    const { name, cuisine, servings, ingredients, steps, authour } = req.body
    try {
        const insertRecipe =
            "INSERT INTO recipes (name, cuisine, servings, ingredients, steps, verified, authour, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
        const result = await pool.query(insertRecipe, [name, cuisine, servings, ingredients, steps, false, authour, Date.now(), ""]);

        if (!result) throw Error("Error occurred when creating a recipe in the database")

        const createdRecipe = result.rows[0];
        return createdRecipe
    } catch (err) {
        throw err
    }
};
