const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

//Configure the View Directory and View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Configure the Static Directory
app.use(express.static(path.join(__dirname, 'public')));

//Create the Index View File

// Read and store accounts.json data
const accounts = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), { encoding: 'utf8' }, (err, data) => {
    if(err) console.log(err);
    console.log('accounts.json was succesfully read');
    return JSON.parse(data);
});

// Read and store users.json data
const users = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), { encoding: 'utf8' }, (err, data) => {
    if(err) console.log(err);
    console.log('users.json was succesfully read');
    return JSON.parse(data);
});

// Create the Index Route
app.get('/', (req, res) => {
    res.render('index', { title: 'Accounts Summary', accounts: accounts });
});

// Create the Savings Account Route
app.get('/savings', (req, res) => {
    res.render('account',  { account: accounts.savings })
});

// Create the Checking Account Route
app.get('/checking', (req, res) => {
    res.render('checking',  { account: accounts.checking })
});

// Create the Credit Account Route
app.get('/credit', (req, res) => {
    res.render('credit',  { account: accounts.credit })
});

// Create the Credit Account Route
app.get('/profile', (req, res) => {
    res.render('profile',  { user: users[0] })
});

app.listen(3000, (err) => {
    if(err) console.log('Error in the server setup');
    console.log('PS Project Running on port 3000!');
});
