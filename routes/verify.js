var express = require('express');
var router = express.Router();
var User = require('../models/user.js')

router.get('/admin', ensureAdmin, function(req, res){
	var newUsers;
	var memberList = [{name: "hannah", email:"test@test.com",id:1}]
	User.getUsersByVerify((err, docs)=>{
		if (err) {console.log(err)};
		newUsers = docs;
	});
	User.getMemberList((err, docs)=>{
		if (err){console.log(err)};
		memberList = docs;
	});
	res.render('members', {verfiedUser: memberList});
});

router.post('/verify/:id', function(req, res){
    var id = req.params.id;
    console.log("id: " + id)
    User.findByIdAndUpdate(id, { $set: { isVerified: true }}, function (err, User) {
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

