var gulp = require( 'gulp' );
var browserify = require ('gulp-browserify');
var concat = require( 'gulp-concat' );
var server = require( 'gulp-live-server' );
var colors = require( 'colors' );

var SERVER_FILE = 'server.js'
var CLIENT_FILE = 'app.js'

gulp.task( 'default', function(){
  // loads the server
  var localhost = server.new( SERVER_FILE );
  localhost.start();
  console.log('starting server'.green)

  // re-execute the server file if any changes were made
  gulp.watch( SERVER_FILE, function(){
    console.log( 'recompiling BE code'.yellow)
    localhost.start.bind( localhost )();
  })

  gulp.watch( './src/*.js', ['browserify'])
});

gulp.task( 'browserify', function(){
  console.log('recompiling FE code'.cyan)
  gulp.src( './src/app.js' )
    .pipe( browserify({
      insertGlobals: true
    }) )
    .pipe( concat( CLIENT_FILE ) )
    .pipe( gulp.dest( './build') )
})