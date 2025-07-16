const mongoose = require('mongoose');

const mongoURL =  'mongodb://localhost:27017/hotels'

// Setup mongodb connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

// Define event listeners for database connection
db.on('connected', ()=>{
    console.log('Connected to the MongoDB server');
});

db.on('disconnected', ()=>{
    console.log('MongoDB disconnected');
});

db.on('error', (err)=>{
    console.log('MongoDB connection error', err);
});
module.exports = db;