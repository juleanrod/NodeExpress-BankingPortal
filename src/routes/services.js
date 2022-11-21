const express = require('express');
const router = require('express').Router();
const { accounts, writeJSON } = require('../data');

// Create the Transfer GET route
router.get('/transfer', (req, res) => {
    res.render('transfer',  { user: users[0] });
});

//Add Payment Feature
router.get('/payment', (req, res) => {
    res.render('payment',  { account: accounts.credit });
});

//=============POST=====================

router.post('/payment', (req, res) => {
accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount);
    writeJSON();
    res.render('payment', {message: 'Payment Successful', account: accounts.credit});
});

router.post('/transfer', (req, res) => {
    accounts[req.body.from].balance -= req.body.amount;
    accounts[req.body.to].balance += parseInt(req.body.amount, 10);
    writeJSON();
    res.render('transfer', {message: 'Transfer Completed'});
});

module.export = router;
