import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file 
import express from 'express';
import recipeRoutes from "./routes";

const app = express();

app.use(express.json());

app.use('/api', recipeRoutes);

export { app };