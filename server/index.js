require('dotenv').config()
const express = require('express');

const api = require('./routes/index.js')

const { PORT } = process.env || 8000;

const app = express(); 

app.listen(PORT, () => {
    console.log(`Application Listening on port: ${PORT}`)
})