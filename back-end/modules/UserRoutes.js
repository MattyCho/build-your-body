'use strict';

const getKey = require('../lib/getKey.js');
const jwt = require('jsonwebtoken');
const User = require('../schemas/userSchema.js');
const axios = require('axios');
const userSchema = require('../schemas/userSchema.js');

const Account = {}

Account.profile = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, function (err, user) {
    if (err) {
      res.send('invalid token - you cannot access this route');
    } else {
      res.json({ 'token': token })
    }
  })
  console.log('profile page');
}

Account.listOfExercises = async (req, res) => {
  await axios.get('https://wger.de/api/v2/exerciseinfo/?limit=200')
    .then(result => {
      // console.log(result.data.results)
      let exerciseData = result.data.results.map(value => {
        let equipment = value.equipment.map(item => item.name)
        let exercise =
        {
          'name': value.name,
          'description': value.description,
          'category': value.category.name,
          'equipment': equipment
        }
        return exercise
      })
      // console.log(exerciseData)
      res.send(exerciseData)
    })
}

Account.saveExercise = async (req, res) => {
  const { email, username, name, description, category, equipment } = req.body;
  const newExercise = { name, description, category, equipment };
  await User.findOne({ "email": email }, (err, user) => {
    if (user) {
      user.exercises.push(newExercise);
      user.save()
        .then(() => { res.send(user.exercises) })
    } else {
      let newUser = new User({ email, username, 'exercises': [newExercise] })
      newUser.save()
        .then(() => { res.send(user.exercises) })
    }
  })
}

Account.deleteExercise = async (req, res) => {
  let id = req.query.id;
  let email = req.query.email;
  await User.findOne({ 'email': email })
    .then(user => {
      let filteredExercises = user.exercises.filter((value) => value.id !== id)
      user.exercises = filteredExercises;
      user.save();
      res.send(user.exercises)
    })
}

module.exports = Account;