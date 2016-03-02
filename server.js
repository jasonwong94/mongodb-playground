var express = require( 'express' );
var app = express();

var bodyParser = require( 'body-parser' );
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var colors = require( 'colors' );
var http= require( 'http').Server( app );
var mongodb= require( 'mongodb' );
var MongoClient = mongodb.MongoClient;
var ObjectId = require( 'mongodb').ObjectID;

var URL = 'mongodb://localhost:27017/jobs';
var PORT_NUMBER = 1800;
var VIEW_DIR = __dirname + '/build'

var numAttempts = 0;

var database;

MongoClient.connect( URL, function( err, db ){
  if( err ){
      console.log( err )
  }
  database = db;
});

app.use( express.static ( VIEW_DIR ) );

app.get( '/', function( req, res ){
   numAttempts++;
   console.log( 'attempt #: ' + numAttempts );
   res.sendFile( VIEW_DIR + '/jobLists.html' );
});

app.get( '/jobs', function( req, res ){
   findJobs( database, function( test ){
      res.json( test );
   })
});

app.post( '/jobs', jsonParser, function( req, res ){
   insertJob( database, req.body, function(){
      res.sendStatus( 200 );
   })
} );

app.put( '/jobs/update/:jobId', jsonParser, function( req, res){
    updateJob( database, req.params.jobId, req.body );
    res.sendStatus( 200 );
})

app.delete( '/jobs/remove/:jobId', function( req, res ){
    console.log( req.params.jobId );
    deleteJob( database, req.params.jobId, function( test ){
      res.sendStatus( 200 );
    })
})

http.listen( PORT_NUMBER, function(){
   console.log( 'running server on ' + PORT_NUMBER );
} )


var insertJob = function( db, data, callback ){
   console.log( data );
   db.collection('jobLists').insert({
      'Company': data.Company,
      'Title': data.Title,
      'Status': data.Status,
      'CreatedOn': data.CreatedOn
   }, function( err, result ){
      if( err ){
         console.log( err )
      } else {
         console.log( 'inserted job' );
         callback( result );
      }
   });
}

var findJobs = function( db, callback ){
   var cursor = db.collection( 'jobLists' ).find();
   var results = [];
   console.log( 'finding jobs' );
   cursor.each( function( err, doc ) {
      if( doc != null ){
        results.push( doc );
      } else {
         callback( results );
      }
   });
}

var deleteJob = function( db, id, callback ){
  db.collection( 'jobLists' ).deleteOne({
    _id: ObjectId( id )
  }, function( err, results ){
    console.log( results );
    callback();
  });
  // console.log( data )
}

var updateJob = function( db, id, data ){
  console.log( id );
  console.log( data );
  db.collection( 'jobLists' ).update(
    {_id: ObjectId( id )},
    {
      _id: ObjectId( id ),
      'Company': data.Company,
      'Title': data.Title,
      'Status': data.Status,
      'CreatedOn': data.CreatedOn,
      'UpdatedOn': data.UpdatedOn
    }
  );
  console.log( 'job updated!' );
}
