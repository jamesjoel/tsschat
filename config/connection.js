var MongoClient=require('mongodb').MongoClient;
var dburl="mongodb://localhost:27017/tssnew";

module.exports.init=function(callback){
	MongoClient.connect(dburl, callback);
}