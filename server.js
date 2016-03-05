var express = require( 'express' );
var app = express();

var bodyParser = require( 'body-parser' );
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var colors = require( 'colors' );
var http= require( 'http').Server( app );

var PORT_NUMBER = 1450;
var VIEW_DIR = __dirname + '/build'

var numAttempts = 0;

var MongoFunctions = require('./mongoFunctions.js');

MongoFunctions.connect()

app.use( express.static ( VIEW_DIR ) );

app.get( '/', function( req, res ){
   numAttempts++;
   console.log( 'attempt #: '.green);
   res.sendFile( VIEW_DIR + '/jobLists.html' );
});

app.get( '/jobs', function( req, res ){
   MongoFunctions.findJobs(function( test ){
      res.json( test );
   })
});

app.post( '/jobs', jsonParser, function( req, res ){
   MongoFunctions.insertJob(req.body, function(){
      res.sendStatus( 200 );
   })
} );

app.put( '/jobs/update/:jobId', jsonParser, function( req, res){
    MongoFunctions.updateJob(req.params.jobId, req.body );
    res.sendStatus( 200 );
})

app.delete( '/jobs/remove/:jobId', function( req, res ){
    console.log( req.params.jobId );
    MongoFunctions.deleteJob(req.params.jobId, function( test ){
      res.sendStatus( 200 );
    })
})

http.listen( PORT_NUMBER, function(){
   console.log( 'running server on ' + PORT_NUMBER );
} )
