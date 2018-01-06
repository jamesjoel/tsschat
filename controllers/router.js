var express=require('express');
var router=express.Router();
var passport = require('passport');
require('../config/passport')(passport);


router.get('/', function(req, res){
	var pageData={ title : "Home Page", pagename : './login/index' };
	res.render('layout', pageData);
});


router.get('/facebook', passport.authenticate('facebook', 
		{
			scope : 'email'
		}
	)
);
router.get('/facebook/callback', passport.authenticate('facebook', 
		{
			successRedirect  : '/chat',
			failureRedirect : '/'

		}
	)
);

router.use('/chat', isLoggedIn, require('./chat'));


router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});


function isLoggedIn(req, res, next){
	// next();
	if(req.isAuthenticated())
		return next();
	req.flash('msg', 'You Are Not Logged In');
	res.redirect('/');
}


module.exports=router;
