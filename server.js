var express = require( 'express' );
var app = express();

var bodyParser = require( 'body-parser' );
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var http= require( 'http').Server( app );
var mongodb= require( 'mongodb' );
var MongoClient = mongodb.MongoClient;
var ObjectId = require( 'mongodb').ObjectID;

var URL = 'mongodb://localhost:27017/jobs';
var PORT_NUMBER = 1200;

var numAttempts = 0;

var database;

MongoClient.connect( URL, function( err, db ){
  if( err ){
      console.log( err )
  }
  database = db;
});


app.get( '/', function( req, res ){
   numAttempts++;
   console.log( 'attempt #: ' + numAttempts );
   app.use( '/', express.static (__dirname + '/') );
   res.sendFile( __dirname + '/jobs.html' );
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

app.delete( '/jobs/:jobId', function( req, res ){
    console.log( req.params.jobId );
    // console.log( req.headers );
    // console.log( json.stringify( req.headers ))
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
