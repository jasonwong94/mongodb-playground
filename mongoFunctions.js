var Database = function(){};

var MongoDB = require( 'mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectId = MongoDB.ObjectId;

const URL = 'mongodb://localhost:27017/jobs';
const collectionName = "jobLists";
Database.prototype.database;

Database.prototype.connect = function() {
	MongoClient.connect(URL, function(err, db){
		if(err)
			console.log(err)
		else{
			this.database = db;
			console.log("Connected to database: " + URL)
		}
	})
};

Database.prototype.findJobs = function(callback) {
	var cursor = database.collection(collectionName).find();
	var results = [];

	cursor.each(function(err, doc){
		if( doc!=null )
			results.push(doc);
		else
			callback(results)
	});
};

Database.prototype.deleteJob = function(id, callback) {
	database.collection(collectionName).deleteOne({
		_id: ObjectId(id)
	}, function(err, results){
		callback();
	})
};

Database.prototype.insertJob = function(data, callback) {
	database.collection(collectionName).insert({
			'Company': data.Company,
			'Title': data.Title,
			'Status': data.Status,
			'CreatedOn': data.CreatedOn
		}, function(err, result){
			if(err)
				console.log(err)
			else{
				console.log('inserted job')
				callback(result)
			}
		}	
	)
};

Database.prototype.updateJob = function(data, id, callback) {
	database.collection(collectionName).update(
		{_id: ObjectId(id)},
		{
			_id: ObjectId(id),
			'Company': data.Company,
			'Title': data.Title,
			'Status': data.Status,
			'CreatedOn': data.CreatedOn,
			'UpdatedOn': data.UpdatedOn
		}
	);
};

module.exports = new Database();