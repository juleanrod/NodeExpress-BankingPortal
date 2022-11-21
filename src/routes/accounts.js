const express = require('express');
const router = express.Router();
const accounts = require('../data');

// Create the Savings Account Route
router.get('/savings', (req, res) => {
    res.render('account',  { account: accounts.savings });
});

// Create the Checking Account Route
router.get('/checking', (req, res) => {
    res.render('checking',  { account: accounts.checking });
});

// Create the Credit Account Route
router.get('/credit', (req, res) => {
    res.render('account',  { account: accounts.credit });
});

module.exports = router;
