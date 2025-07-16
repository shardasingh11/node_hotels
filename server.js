const express = require('express');

const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //convert the request body data into object then store in the req.body

const Person = require('./models/Person');
const MenuItem = require('./models/Menu');


app.get('/', function(req, res){
    res.send("Welcome to my hotel Taj!.. How can I help you?")
});





//Import the router file
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

//Use the router
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(3000, ()=>{
    console.log("listening on port 3000");
});