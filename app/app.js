const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const Burger = require('./routes/burger');
const Fries = require('./routes/fries'); 
const Menu = require('./routes/menu');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {  
    res.sendFile(path.join(__dirname, 'views/doc.html'));
});

/* endpoints */
/*
app.use('/burgers', Burger);
app.use('/fries', Fries);      
app.use('/menu', Menu);        
*/
module.exports = app;