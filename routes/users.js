const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models')
const { User } = db

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function (req, res, next) {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

router.post('/login', function (req, res, next) {
  res.render('index', { title: 'a/A Express Skeleton Home' });
  res.redirect('/')
});

router.get('/register', csrfProtection, asyncHandler(async (req, res, next) => {
  const user = User.build()
  res.render('register-user', { title: 'Register Dinosaur', user, csrfToken: req.csrfToken() })
}));

router.const('/register', csrfProtection, asyncHandler(async (req, res, next) => {
  const { userName, emailAddress, password } = req.body;

}));


module.exports = router;
