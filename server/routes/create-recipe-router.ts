import { Request, Response } from "express";
import fs from "fs";

export const createRecipe = async (req: any, res: any) => {
    fs.readFile("recipes.json", "utf8", function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            const recipes = JSON.parse(data);
            const recipe = req.body;

            recipes.push(recipe);
            fs.writeFile(
                "recipes.json",
                JSON.stringify(recipes),
                "utf8",
                function (err) {
                    if (err) throw err;
                    return res.json({ message: "Recipes added!" });
                }
            );
        }
    });
};
