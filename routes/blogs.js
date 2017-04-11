let express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user.js'),
    Advert = require('../models/advert.js'),
    Middleware = require('../middleware/middleware.js');

router.get('/blogs/new', Middleware.isLoggedIn, (request, response) =>
{
  response.render('blogs/new');
});

router.post('/adverts', Middleware.isLoggedIn, (request, response) =>
{
  response.send('blog created');
});

module.exports = router;
