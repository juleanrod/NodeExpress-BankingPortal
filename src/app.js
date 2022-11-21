const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

//Configure the View Directory and View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Configure the Static Directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Read and store accounts.json data
const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), { encoding: 'utf8' }, (err, data) => {
    if(err) console.log(err);
    console.log('accounts.json was succesfully read');
});
const accounts = JSON.parse(accountData);

// Read and store users.json data
const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), { encoding: 'utf8' }, (err, data) => {
    if(err) console.log(err);
    console.log('users.json was succesfully read');
});
const users = JSON.parse(userData);

//=============GET=====================
// Create the Index Route
app.get('/', (req, res) => {
    res.render('index', { title: 'Account Summary', accounts: accounts });
});

// Create the Savings Account Route
app.get('/savings', (req, res) => {
    res.render('account',  { account: accounts.savings });
});

// Create the Checking Account Route
app.get('/checking', (req, res) => {
    res.render('checking',  { account: accounts.checking });
});

// Create the Credit Account Route
app.get('/credit', (req, res) => {
    res.render('account',  { account: accounts.credit });
});

// Create the Profile Route
app.get('/profile', (req, res) => {
    res.render('account',  { user: users[0] });
});

// Create the Transfer GET route
app.get('/transfer', (req, res) => {
    res.render('transfer',  { user: users[0] });
});

//Add Payment Feature
app.get('/payment', (req, res) => {
    res.render('payment',  { account: accounts.credit });
});

//=============POST=====================

app.post('/payment', (req, res) => {
accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount);
    let accountsJSON = JSON.stringify(accounts, null, 4)
    fs.writeFileSync(path.join(__dirname, 'json','accounts.json'), accountsJSON, 'utf8');
    res.render('payment', {message: 'Payment Successful', account: accounts.credit});
});

app.post('/transfer', (req, res) => {
    accounts[req.body.from].balance -= req.body.amount;
    accounts[req.body.to].balance += parseInt(req.body.amount, 10);
    let accountsJSON = JSON.stringify(accounts, null, 4)
    fs.writeFileSync(path.join(__dirname, 'json','accounts.json'), accountsJSON, 'utf8');
    res.render('transfer', {message: 'Transfer Completed'});
});


app.listen(3000, (err) => {
    if(err) console.log('Error in the server setup');
    console.log('PS Project Running on port 3000!');
});
