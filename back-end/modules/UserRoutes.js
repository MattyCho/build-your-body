'use strict';

const getKey = require('../lib/getKey.js');
const jwt = require('jsonwebtoken');
// const User = require('../models/User.js');

const Account = {}

Account.profile = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, function(err, user) {
    if (err) {
      res.send('invalid token - you cannot access this route');
    } else {
      res.json({ 'token': token })
    }
  })
  console.log('profile page');
}

module.exports = Account;