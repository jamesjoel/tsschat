var path = require('path');
var express=require('express');
var router=express.Router();


var Student=require('../models/student');

router.get('/', function(req, res){
	res.sendFile(path.resolve('views/angular/index.html'));
	
});
router.get('/getdata', function(req, res){
	
	Student.getAll(function(err, doc){
		if(err)
			return;
		res.send({ data : doc });
	})
});

router.post('/savedata', function(req, res){
	if(req.body._id){
		Student.update(req.body, function(err, doc){
			if(err)
				return;

			console.log(doc);
			res.send({ data : doc });
		})
	}
	else
	{
		Student.insert(req.body, function(err, doc){
			if(err)
				return;

			console.log(doc);
			res.send({ data : doc.ops[0] });
		})
		
	}

	
});
router.post('/student', function(req, res){
	console.log(req.body);
});
router.post('/deleteData', function(req, res){
	console.log(req.body);
	Student.remove(req.body, function(err, result){
		if(err){
			console.log('error while deleting', err);
			return;
		}
		console.log("success",result);
		res.send({ data :result});
	});
});

router.get('/pages', function(req, res){
	var record_per_pages = 4;
	Student.getAll(function(err, doc){
		if(err)
			return;
		Student.getLimitedRec(0, record_per_pages,function(err, doc1){
			if(err)
				return;
			var total_rec = doc.length;
			var pages = Math.ceil(total_rec/record_per_pages);


			res.render('angular/new', { data : doc1, pages : pages });
		})

	})
	// res.send("page/s");
});
router.get('/pages/:id', function(req, res){
	console.log(req.params);
	var skip = parseInt(req.params.id);
	var record_per_pages = 4;
	Student.getAll(function(err, doc){
		if(err)
			return;
		Student.getLimitedRec(skip, record_per_pages, function(err, doc1){
			if(err)
				return;
			var total_rec = doc.length;
			var pages = Math.ceil(total_rec/record_per_pages);


			res.render('angular/new', { data : doc1, pages : pages });
		})

	})

});


module.exports=router;