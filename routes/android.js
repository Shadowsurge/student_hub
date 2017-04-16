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

module.exports = router;
