var express = require('express');
var festival = require('../app/api/festival');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router
    .get('/festivals', festival.list_festivals)
    .get('/festivals/:id', festival.query_festival_detail)
    .post('/festivals', festival.create_festival)
    .put('/festivals/:id', festival.update_festival)
    .delete('/festivals/:id', festival.delete_festival);


module.exports = router;
