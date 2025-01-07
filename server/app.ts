import express from 'express';
import api from "./routes"

const PORT = 3000;
const app = express();

app.use(express.json());

app.get('/api', api);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}/api...`);
});

export default app;