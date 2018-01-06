var express=require('express');
var router=express.Router();

router.get('/', function(req, res){
	console.log("--------------------SESSION",req.user);
	var pageData={ title : "Chat Room", pagename : './chat/index', data : req.user };
	res.render('layout', pageData);
});

module.exports=router;