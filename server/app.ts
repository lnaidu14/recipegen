import express from 'express';
import recipeRoutes from "./routes";

const PORT = 3000;
const app = express();

app.use(express.json());

app.use('/api', recipeRoutes);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}/api...`);
});

export default app;