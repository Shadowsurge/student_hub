let express = require('express'),
    router = express.Router(),
    Advert = require('../models/advert.js');

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
    response.json({user});
    // passport.authenticate("local")(request, response,  () =>
    // {
    //   response.status(200).json({message: `Thanks for signing up, ${user.username}`});
    // });
  });
});

module.exports = router;
