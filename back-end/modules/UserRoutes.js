'use strict';

const getKey = require('../lib/getKey.js');
const jwt = require('jsonwebtoken');
const User = require('../schemas/userSchema.js');

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

Account.listOfExercises = (req, res) => {
  axios.get('https://wger.de/api/v2/exerciseinfo')
  .then(result => res.send(result.data.results))
}

Account.saveExercise = async (req, res) => {
  const { email, username, name, description, category, equipment } = req.body;
  const newExercise = {name, description, category, equipment};
  await User.findOne({"email": email}, (err, user) =>{
    if (user) {
      user.exercises.push(newExercise);
      user.save()
      .then(() => {res.send(user.exercises)})
    } else {
      let newUser = new User({ email, username, 'exercises':[newExercise]})
      newUser.save()
      .then(() => {res.send(user.exercises)})
    }  
  })
}

module.exports = Account;