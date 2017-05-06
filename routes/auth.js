var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/training', ensureAuthenticated, function(req, res){
	res.render('auth');
});

function ensureAuthenticated(req, res, next){
	console.log("is it getting here");
	console.log("TEST2", req.session.isAuth)
	if(req.session.isAuth && req.isAuthenticated()){
		//Session cookies needs to be set here and training module should only be accessible if the session cookie exists
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;