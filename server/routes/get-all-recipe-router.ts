import { Request, Response, NextFunction } from "express";
import { pool } from "../../db/pg"

export const getAllRecipes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getRecipe =
            "SELECT * FROM RECIPES;";
        const result = await pool.query(getRecipe);

        return result.rows
    } catch (err) {
        next(err);
    }
};
