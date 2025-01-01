const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', require('./routes'));

connectDB();
app.get('/', (req, res) => {
    res.send('Hello World!');
});


module.exports = app;