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
    const amount = parseInt(req.body.amount);
    const balance = parseInt(accounts.credit.balance);
    accounts.credit.balance = (balance - amount).toString();
    
    const credit_available = parseInt(accounts.credit.available);
    accounts.credit.available = (amount + credit_available).toString();

    const accountsJSON = JSON.stringify(accounts);

    fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON,'utf8');
    
    res.render('payment', { message: 'Payment Successful', account: accounts.credit });
});

app.post('/transfer', (req, res) => {
    const from = req.body.from;
    const to = req.body.to;
    const amount = parseInt(req.body.amount);

    ((accs, type, amount) => {
        const currentBalance = parseInt(accounts[type].balance);
        accounts[type].prev_balance = currentBalance.toString();
        accounts[type].balance = (currentBalance-amount).toString();
    })(accounts, from, amount);
    ((accs, type, amount) => {
        const currentBalance = parseInt(accounts[type].balance);
        accounts[type].prev_balance = currentBalance.toString();
        accounts[type].balance = (currentBalance+amount).toString();
    })(accounts, to, amount);

    const accountsJSON = JSON.stringify(accounts);

    fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON,'utf8');

    res.render('transfer', { message: 'Transfer Completed' });

});


app.listen(3000, (err) => {
    if(err) console.log('Error in the server setup');
    console.log('PS Project Running on port 3000!');
});
