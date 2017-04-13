let express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user.js'),
    Advert = require('../models/advert.js'),
    Middleware = require('../middleware/middleware.js');

router.get('/adverts/new', Middleware.isLoggedIn, (request, response) =>
{
  response.render('adverts/new');
});

router.post('/adverts', Middleware.isLoggedIn, (request, response) =>
{
  if(!request.body.title || !request.body.content)
  {
    request.flash("error", "All fields are required!");
    return response.redirect('/adminpage');
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
          request.flash("success", `Added a new advert to the account - ${saveResult.username}`);
          response.redirect('/adminpage');
      });
    });
  });
});

router.put('/adverts/:id/approve', Middleware.isLoggedIn, Middleware.isAdmin, (request, response) =>
{
  Advert.findByIdAndUpdate(request.params.id,
  {
    $set:
    {
      approved: true,
      approvedBy:
      {
        id: request.user._id,
        username: request.user.username
      }
    },
  },
  {
    returnOriginal: false
  }).then((updatedDocument) =>
  {
    request.flash("success", `${updatedDocument.title}, by ${updatedDocument.author.username}, has been approved successfully.`);
    response.redirect(`/adminpage`);
  }).catch((error) =>
  {
    console.log(error);
  })
});

router.delete('/adverts/:id/delete', Middleware.isLoggedIn, Middleware.isAdmin, (request, response) =>
{
  // reference this - http://stackoverflow.com/questions/39424531/mongoose-mongodb-remove-an-element-on-an-array
  Advert.findById(request.params.id).then(function(advert)
  {
    return advert.remove();
  }).then(function()
  {
    console.log('Removed advert');
    return response.redirect('/adminpage');
  }).catch(function(error)
  {
    console.log(error);
  });
});

module.exports = router;
