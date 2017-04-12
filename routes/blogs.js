let express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user.js'),
    Advert = require('../models/advert.js'),
    Blog = require('../models/blog.js'),
    Middleware = require('../middleware/middleware.js');

router.get('/blogs/new', Middleware.isLoggedIn, (request, response) =>
{
  response.render('blogs/new');
});

router.post('/blogs', Middleware.isLoggedIn, (request, response) =>
{
  if(!request.body.title || !request.body.content)
  {
    request.flash("error", "All fields are required!");
    return response.redirect('back');
  }

  let blog = new Blog({
    title: request.body.title,
    submittedBy: request.body.author,
    content: request.body.content
  });

  blog.save().then((result) =>
  {
    request.flash("success", "Posted the blog");
    response.redirect('adminpage');
  });
});

module.exports = router;
