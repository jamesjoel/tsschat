var MongoDB=require('mongodb');
var con=require('../config/connection');

module.exports.insert=function(data, callback){
	con.init(function(err, db){
		if(err){
			console.log('Connection Error', err);
			return;
		}

		db.collection('student').insert(data, callback);
	});
}

module.exports.update=function(data, callback){
	con.init(function(err, db){
		if(err){
			console.log('Connection Error', err);
			return;
		}
		var where = {_id : new MongoDB.ObjectID(data._id)};
		delete data._id;
		// console.log(where, '--------------' ,data);		
		// db.collection('student').findAndModify(where, data, callback);
		// db.collection('student').findOneAndUpdate(where, data, { returnOriginal: false }, callback)
		db.collection('student').updateOne(where, data, { returnOriginal: false }, callback)
	});
}


module.exports.getWhereOne=function(where, callback){
	con.init(function(err, db){
		if(err){
			console.log('Connection Error', err);
			return;
		}
		db.collection('student').findOne(where, callback);
	})
}
module.exports.getAll=function(callback){
	con.init(function(err, db){
		if(err){
			console.log('Connection Error', err);
			return;
		}
		db.collection('student').find().toArray(callback);
	})	
}


module.exports.getLimitedRec=function(skip,limit, callback){
	con.init(function(err, db){
		if(err){
			console.log('Connection Error', err);
			return;
		}
		db.collection('student').find().limit(limit).skip(skip).toArray(callback);
	})	
}



module.exports.remove=function(where, callback){
	con.init(function(err, db){
		if(err){
			console.log('Connection Error', err);
			return;
		}
		var obj = { _id : new MongoDB.ObjectID(where._id) };
		db.collection('student').findOneAndDelete(obj, callback);
	})	
}