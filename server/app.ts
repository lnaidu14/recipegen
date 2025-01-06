import express from 'express';

const PORT = 5000;

const app = express();

app.get('/api', (req, res) => {
    res.send('Server Running...');
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}/api...`);
});

export default app;