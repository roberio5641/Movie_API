const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();


const connectDB = require('../config/db');
const errorHandler = require('../middleware/errorMiddleware');


const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const movieRoutes = require('../routes/movieRoutes');


connectDB();

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);

app.get('/health', (req, res) => {
    res.status(200).send('API esta funcionando normalmente');
})


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
