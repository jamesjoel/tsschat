var express=require('express');
var multer = require('multer');
var path=require('path');
var router=express.Router();

var storage=multer.diskStorage({
	destination : function(req, file, callback){
		callback(null, './upload');	
	},
	filename : function(req, file, callback){
		console.log(file);
		callback(null, Date.now()+path.extname(file.originalname));
	}
});



// var storage = multer.diskStorage({
// 	destination : function(req, file, callback){
// 		callback(null, './upload')
// 	},

// 	filename : function(req, file, callback){
// 		// console.log(file);
// 		callback(null, Date.now()+file.originalname)
// 	}
// });
// var uploadImage=multer({ storage : storage}).single('image');




router.get('/upload', function(req, res){
	// res.send("THIS IS USER PAGE");
	var pageData={ title : "Upload Page", pagename : './upload/index'};
	res.render('layout', pageData);
});

router.post('/upload', multer({storage : storage}).single('image'), function(req, res){
	console.log("Data Comming");
})




// router.post('/upload', function(req, res){
// 	uploadImage(req, res, function(err){
// 		if(err){
// 			console.log('some error', err);
// 		}
// 		console.log('file uploaded');
// 	});
// 	console.log(req.file);
// });
module.exports=router;


/*

var uploadProfileImgs = multer({dest : './files/uploads/profile/'}).single('avatar');

app.post('/profile', function (req, res) {
  uploadProfileImgs(req, res, function (err) {
    if (err) {
      console.log(err.message);
      // An error occurred when uploading
      return
    }
    console.log('Everything went fine');
    // Everything went fine
  })
})

*/