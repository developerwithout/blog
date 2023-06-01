const mongoose = require('mongoose')

const connectDB = (connectionString = "") => {
    try {
        const connection = mongoose.connect(connectionString,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connection Created')
        return connection;
    } catch (error) {
        console.error("MongoDB Connection Error");
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB
