let MiddlewareObject =
{
  isLoggedIn: (request, response, next) =>
  {
    if(request.isAuthenticated())
    {
      return next();
    }

    request.flash("error", "Please log in first");
    response.redirect('/');
  },

  isAdmin: (request, response, next) =>
  {
    if(request.user.isAdmin)
    {
      return next();
    }

    request.flash("error", "You must be signed in as an admin to see this section.");
    response.redirect('/');
  }
}

module.exports = MiddlewareObject;
