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
    return response.redirect('back');
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

router.get('/adverts/:live', Middleware.isLoggedIn, Middleware.isAdmin, (request, response) =>
{
  let adverts = {};

  switch(request.params.live)
  {
    case "art":
      Advert.find({school: "art", approved: true}).then((adverts) =>
      {
        return response.render("adverts/live", {adverts});
      });
      break;

    case "dentistry":
      Advert.find({school: "dentistry", approved: true}).then((adverts) =>
      {
        return response.render("adverts/live", {adverts});
      });
      break;

    case "education":
      Advert.find({school: "education", approved: true}).then((adverts) =>
      {
        return response.render("adverts/live", {adverts});
      });
      break;

    case "humanities":
      Advert.find({school: "humanities", approved: true}).then((adverts) =>
      {
        return response.render("adverts/live", {adverts});
      });
      break;

    case "life_sciences":
      Advert.find({school: "life_sciences", approved: true}).then((adverts) =>
      {
        return response.render("adverts/live", {adverts});
      });
      break;

    case "medicine":
      Advert.find({school: "medicine", approved: true}).then((adverts) =>
      {
        return response.render("adverts/live", {adverts});
      });
      break;

    case "nursing":
      Advert.find({school: "nursing", approved: true}).then((adverts) =>
      {
        return response.render("adverts/live", {adverts});
      });
      break;

    case "science":
      Advert.find({school: "science", approved: true}).then((adverts) =>
      {
        return response.render("adverts/live", {adverts});
      });
      break;

    case "social_sciences":
      Advert.find({school: "social_sciences", approved: true}).then((adverts) =>
      {
        return response.render("adverts/live", {adverts});
      });
      break;
  }
});

// TODO add in an undo??
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
    response.redirect(`back`);
  }).catch((error) =>
  {
    request.flash("error", "Something went wrong, check your connection/refresh and try again!");
    response.redirect('back');
  })
});

// TODO add in an undo??
router.delete('/adverts/:id/delete', Middleware.isLoggedIn, Middleware.isAdmin, (request, response) =>
{
  // reference this - http://stackoverflow.com/questions/39424531/mongoose-mongodb-remove-an-element-on-an-array
  Advert.findById(request.params.id).then(function(advert)
  {
    return advert.remove();
  }).then(function(advert)
  {
    request.flash("success", `${advert.title} - has been deleted.`);
    return response.redirect('back');
  }).catch(function(error)
  {
    console.log(error);
  });
});

module.exports = router;
