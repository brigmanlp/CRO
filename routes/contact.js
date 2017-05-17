var express = require('express');
var router = express.Router();

//
router.post('/contact', function(req, res){
	
    res.redirect('/');
});



module.exports = router;