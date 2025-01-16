import { Request, Response, NextFunction } from "express";
import { pool } from "../../db/pg"

export const createRecipe = async (req: any, res: any, next: NextFunction) => {
    const { name, cuisine, servings, ingredients, steps, verified } = req.body
    try {
        const insertRecipe =
            "INSERT INTO recipes (name, cuisine, servings, ingredients, steps, verified) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
        const result = await pool.query(insertRecipe, [name, cuisine, servings, ingredients, steps, false]);

        const createdRecipe = result.rows[0];
        return res.json(createdRecipe);
    } catch (err) {
        next(err);
    }
};
