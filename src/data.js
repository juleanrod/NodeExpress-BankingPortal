const fs = require('fs');
const path = require('path');

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
const users = JSON.parse(accountData);

const writeJSON = () => {
    let accountsJSON = JSON.stringify(accounts, null, 4)
    fs.writeFileSync(path.join(__dirname, 'json','accounts.json'), accountsJSON, 'utf8');
}

module.exports = { accounts, users, writeJSON };


