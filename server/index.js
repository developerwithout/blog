require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const APIRoutes = require('./routes/index')

const app = express();
const { PORT = 8080, MONGODB_URI='' } = process.env;

app.use(express.json())
app.use(cookieParser())

const connectDB = require('./config/database')(MONGODB_URI);

app.use('/api', APIRoutes)

app.use((err, req, res, next) => {
    console.error(err.status === 404 ? `404 ${req.url}` : err.stack);
    res.status(err.status || 500).send("Application Error");
});

app.listen(PORT, () => {
    console.log(`Application Listening on port: ${PORT}`)
})