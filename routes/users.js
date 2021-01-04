const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator')
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models')
const { User } = db


const userValidators = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage("Please provide a dinosaur name; you're a dinosaur, aren't you?")
    .isLength({ max: 50 })
    .withMessage("Dinosaur name must be no more than 50 characters long."),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid e-mail address.')
    .isLength({ max: 255 })
    .withMessage('E-mail address must not be more than 255 characters long.')
    .isEmail()
    .withMessage('E-mail address is not a valid email')
    .custom((value) => {
      return User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided e-mail address is already in use by another account');
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    }),
]

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

router.post('/register', csrfProtection, userValidators, asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.body)
  const user = User.build({
    username,
    email,
    // , hashedPassword
  })

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser(req, res, user);
    res.redirect('/'); // localhost:8080/
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('register-user', {
      title: 'Register Dinosaur',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));


module.exports = router;
