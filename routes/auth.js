var express = require('express');
var router = express.Router();
var User = require('../models/user.js')

// Get Homepage
router.get('/training', ensureAuthenticated, function(req, res){
	console.log("Admin: " + req.session.isAdmin);
	console.log("Auth: " + req.session.isAuth);
	console.log("Verified: " + req.session.isVerified);
	res.render('auth');
});

function ensureAuthenticated(req, res, next){
	if(req.session.isAuth && req.isAuthenticated()){
		//Session cookies needs to be set here and training module should only be accessible if the session cookie exists
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}
router.get('/admin', ensureAdmin, function(req, res){
	User.getUsersByVerify((err, docs)=>{
		if (err) {console.log(err)};
		var newUsers = docs;
		console.log(newUsers);
		res.render('verify', {newUsers: newUsers, id: newUsers.id});
	});
});

router.post('/verify/:id', function(req, res){
    var id = req.params.id;
	console.log('id: ' + id)
    User.findByIdAndUpdate({_id: id}, { $set: { isverified: true }}, function (err, User) {
		console.log('In Function find and update \n id: ' + id + '\n User: ' + User)
		if (err) return handleError(err);
        res.send(User);
    });
});

function ensureAdmin(req, res, next){
	if(req.session.isAdmin && req.isAuthenticated()){
		//Session cookies needs to be set here and training module should only be accessible if the session cookie exists
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/training');
	}
}

module.exports = router;