var con=require('../config/connection');

module.exports.insert=function(data, callback){
	con.init(function(err, client){
		if(err){
			console.log('Connection Error', err);
			return;
		}
		var db = client.db('tssnew');
		db.collection('user').insert(data, callback);
	});
}
module.exports.insertOrUpdate=function(where, data, callback){
	con.init(function(err, client){
		if(err){
			console.log('Connection Error', err);
			return;
		}
		var db = client.db('tssnew');
		db.collection('user').update(where, data, { upsert : true }, callback);
	});
}

module.exports.getWhereOne=function(where, callback){
	con.init(function(err, client){
		if(err){
			console.log('Connection Error', err);
			return;
		}
		var db = client.db('tssnew');
		db.collection('user').findOne(where, callback);
	})
}