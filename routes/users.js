var express = require('express');
var router = express.Router();

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

router.get('/register', function (req, res, next) {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

router.post('/register', function (req, res, next) {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});


module.exports = router;
