var express=require('express');
var router=express.Router();


router.get('/user', function(req, res){
	// res.send("THIS IS USER PAGE");
	var pageData={ title : "User Page", pagename : './user/index'};
	res.render('layout', pageData);
});
module.exports=router;
