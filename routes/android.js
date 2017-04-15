let express = require('express'),
    router = express.Router(),
    Advert = require('../models/advert.js');

router.get('/android/art', (request, response) =>
{
  let adverts = {}

  Advert.find({school: "art", approved: true}).then((adverts) =>
  {
    response.status(200).json({adverts});
  });
});

module.exports = router;
