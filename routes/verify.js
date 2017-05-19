var express = require('express');
var router = express.Router();
var User = require('../models/user.js')

// router.get('/admin', ensureAdmin, function(req, res){
// 	var newUsers;
// 	var memberList;
// 	User.getUsersByVerify((err, docs)=>{
// 		if (err) {console.log(err)};
// 		newUsers = docs;
// 	});
// 	User.getMemberList((err, docs)=>{
// 		if (err){console.log(err)};
// 		memberList = docs;
// 	});
// 	res.render('admin', {newUsers: newUsers},{verfiedUser: memberList});
// });

router.post('/verify/:id', function(req, res){
    var id = req.params.id;
    console.log("id: " + id)
    User.findByIdAndUpdate(id, { $set: { isVerified: true }}, function (err, User) {
        if (err) return handleError(err);
        res.redirect('admin');
    });
});
router.post('/makeAdmin/:id', function(req, res){
    var id = req.params.id;
    console.log("id: " + id)
    User.findByIdAndUpdate(id, { $set: { isAdmin: true }}, function (err, User) {
        if (err) return handleError(err);
        res.redirect('admin');
    });
});
router.post('/deleteUser/:id', function(req, res){
    var id = req.params.id;
    console.log("id: " + id)
    User.findOneAndRemove({ "_id": id }, function (err, User) {
        if (err) return handleError(err);
        res.redirect('admin');
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

