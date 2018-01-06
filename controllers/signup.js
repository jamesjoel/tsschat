var express=require('express');
var router=express.Router();
var user=require('../models/user');

router.get('/signup', function(req, res){
	var pageData={ title : "Signup Page", pagename : './signup/index', message : req.flash('msg')};
	res.render('layout', pageData);
});
router.post('/signup', function(req, res){
	delete req.body.cnf_password;
	user.getWhereOne({ email : req.body.email }, function(err, doc){
		if(err){
			console.log('Select error', err);
			return;
		}
		if(doc && doc != null)
		{
			req.flash("msg", "Email Already Exists");
			res.redirect('/signup');
		}
		else
		{
			user.insert(req.body, function(err, result){
					if(err){
						console.log('Insert Error', err);
						return;
					}
					req.flash('msg', 'Signup Complete');
					res.redirect('/login');
				});
		}
	});
	
});


module.exports=router;

/*


*/
