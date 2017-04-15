let express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user.js'),
    Advert = require('../models/advert.js'),
    Middleware = require('../middleware/middleware.js');

// Get home page or dashboard
router.get('/', (request, response) =>
{
  if(request.user && request.user.isAdmin)
  {
    response.redirect('/adminpage');
  }
  response.render('home');
});

router.get('/apptest', (request, response) =>
{
  response.send(JSON.stringify({hello : "hello"}));
})

// Login route
router.post('/login', passport.authenticate("local",
{
  successRedirect: '/adminpage',
  failureRedirect: '/'
}));

// Logout route
router.get('/logout', (request, response) =>
{
  request.logout();
  request.flash("success", "You have successfully logged out!");
  response.redirect('/');
});

// Load adminpage with pending adverts
router.get('/adminpage', Middleware.isLoggedIn, Middleware.isAdmin, (request, response) =>
{
  let collectedAdverts = {};

  Advert.find({school: "art", approved: false}).limit(4).then((artAdverts) =>
  {
    Advert.find({school: "dentistry", approved: false}).limit(4).then((dentistAdverts) =>
    {
      Advert.find({school: "education", approved: false}).limit(4).then((educationAdverts) =>
      {
        Advert.find({school: "humanities", approved: false}).limit(4).then((humanitiesAdverts) =>
        {
          Advert.find({school: "life_sciences", approved: false}).limit(4).then((lifeAdverts) =>
          {
            Advert.find({school: "medicine", approved: false}).limit(4).then((medicineAdverts) =>
            {
              Advert.find({school: "nursing", approved: false}).limit(4).then((nursingAdverts) =>
              {
                Advert.find({school: "science", approved: false}).limit(4).then((scienceAdverts) =>
                {
                  Advert.find({school: "social_sciences", approved: false}).limit(4).then((socialAdverts) =>
                  {
                    collectedAdverts.artAdverts = artAdverts;
                    collectedAdverts.dentistAdverts = dentistAdverts;
                    collectedAdverts.educationAdverts = educationAdverts;
                    collectedAdverts.humanitiesAdverts = humanitiesAdverts;
                    collectedAdverts.lifeAdverts = lifeAdverts;
                    collectedAdverts.medicineAdverts = medicineAdverts;
                    collectedAdverts.nursingAdverts = nursingAdverts;
                    collectedAdverts.scienceAdverts = scienceAdverts;
                    collectedAdverts.socialAdverts = socialAdverts;

                    Advert.find({school: "art", approved: false}).count().then((artCount) =>
                    {
                      Advert.find({school: "dentistry", approved: false}).count().then((dentistryCount) =>
                      {
                        Advert.find({school: "education", approved: false}).count().then((educationCount) =>
                        {
                          Advert.find({school: "humanities", approved: false}).count().then((humanitiesCount) =>
                          {
                            Advert.find({school: "life_sciences", approved: false}).count().then((lifeCount) =>
                            {
                              Advert.find({school: "medicine", approved: false}).count().then((medicineCount) =>
                              {
                                Advert.find({school: "nursing", approved: false}).count().then((nursingCount) =>
                                {
                                  Advert.find({school: "science", approved: false}).count().then((scienceCount) =>
                                  {
                                    Advert.find({school: "social_sciences", approved: false}).count().then((socialCount) =>
                                    {
                                      collectedAdverts.artCount = artCount;
                                      collectedAdverts.dentistryCount = dentistryCount;
                                      collectedAdverts.educationCount = educationCount;
                                      collectedAdverts.humanitiesCount = humanitiesCount;
                                      collectedAdverts.lifeCount = lifeCount;
                                      collectedAdverts.medicineCount = medicineCount;
                                      collectedAdverts.nursingCount = nursingCount;
                                      collectedAdverts.scienceCount = scienceCount;
                                      collectedAdverts.socialCount = socialCount;

                                      response.status(200).render('adminpage', {collectedAdverts});
                                    })
                                  })
                                })
                              })
                            })
                          })
                        })
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

// Create admin route
router.post('/admin', Middleware.isLoggedIn, Middleware.isAdmin, (request, response) =>
{
  console.log('reached admin route')
  User.register(new User({
    username: request.body.adminUsername,
    isAdmin: true
  }), request.body.adminPassword, (error, user) =>
  {
    if(error)
    {
      request.flash("error", error.message);
      return response.redirect('/');
    }

    console.log('registered admin');
    request.flash("success", `You have registered: ${user.username}, as a new admin.`);
    response.redirect('/adminpage');
  });
});

module.exports = router;
