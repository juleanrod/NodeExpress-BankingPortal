const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

//Configure the View Directory and View Engine
app.set(path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//Configure the Static Directory
app.set(path.join(__dirname, 'src', 'public'));

//Create the Index View File


// Create the Index Route
app.get('/', (req, res) => {
    res.render('index', { title: 'Index' });
});

app.listen(3000, (err) => {
    if(err) console.log('Error in the server setup');
    console.log('PS Project Running on port 3000!');
});
