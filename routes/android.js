let express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    Advert = require('../models/advert.js'),
    User = require('../models/user.js');

// Login route
router.post('/android/login', passport.authenticate("local",
{
  successRedirect:  '/android/loginsuccess',
  failureRedirect: '/android/loginfailed'
}));

router.get('/android/loginsuccess', (request, response) =>
{
  response.send("Logged in");
});

router.get('/android/loginfailed', (request, response) =>
{
  response.send("Login failed");
});

router.get('/android/:id', (request, response) =>
{
  let adverts = {}

  Advert.find({school: request.params.id, approved: true}).then((adverts) =>
  {
    response.status(200).json({adverts});
  });
});

router.post('/android/register', (request, response) =>
{
  User.register(new User({
    username: request.body.username
  }), request.body.password, (error, user) =>
  {
    if(error)
    {
      return response.status(400).json({message: `This went wrong: ${error}`});
    }
    response.send("It worked");
    // passport.authenticate("local")(request, response,  () =>
    // {
    //   response.status(200).json({message: `Thanks for signing up, ${user.username}`});
    // });
  });
});


module.exports = router;
