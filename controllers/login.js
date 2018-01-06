var express=require('express');
var router=express.Router();

var user=require('../models/user');
router.get('/login', function(req, res){
	var pageData={ title : "Login Page", pagename : './login/index', message : req.flash('msg') };
	res.render('layout', pageData);
});


router.get('/login/test', function(req, res){
	console.log("hello");
	res.send("hello world");
})

router.post('/login', function(req, res){
	user.getWhereOne({ email : req.body.email }, function(err, doc){
		if(err){
			console.log('Getting Data Error', err);
			return;
		}
		if(doc && doc != null){
			if(doc.password == req.body.password)
			{
				req.session.user_logged_in=true;
				res.redirect('/user');
			}
			else
			{
				req.flash('msg', 'This password is incorrect');
				res.redirect('/login');	
			}
		}
		else{
			req.flash('msg', 'This username and password is incorrect');
			res.redirect('/login');

		}
	});	
});

module.exports=router;