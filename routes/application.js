let express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    Advert = require('../models/advert.js'),
    User = require('../models/user.js');

// Login route
router.post('/application/login', passport.authenticate("local",
{
  successRedirect:  '/application/loginsuccess',
  failureRedirect: '/application/loginfailed'
}));

router.get('/application/loginsuccess', (request, response) =>
{
  response.send("Logged in");
});

router.get('/application/loginfailed', (request, response) =>
{
  response.send("Login failed");
});

router.get('/application/:id', (request, response) =>
{
  let adverts = {}

  Advert.find({school: request.params.id, approved: true}).then((adverts) =>
  {
    response.status(200).json({adverts});
  });
});

router.post('/application/register', (request, response) =>
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

router.post('/application/advert', Middleware.isLoggedIn, (request, response) =>
{
  if(!request.body.title || !request.body.content)
  {
    return response.send("Missing Data");
  }

  let advert = new Advert({
    title: request.body.title,
    author:
    {
      id: request.user._id,
      username: request.user.username
    },
    content: request.body.content,
    school: request.body.category,
    createdAt: new Date()
  });

  advert.save().then((result) =>
  {
    User.findById(request.user._id).then((foundUser) =>
    {
      foundUser.adverts.push(advert);
      foundUser.save().then((saveResult) =>
      {
          response.send("Advert created successfully!");
      });
    });
  });
});


module.exports = router;