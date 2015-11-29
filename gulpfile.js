var gulp = require( 'gulp' );
var browserify = require ('gulp-browserify');
var concat = require( 'gulp-concat' );
var server = require( 'gulp-live-server' );

var SERVER_FILE = 'server.js'
var CLIENT_FILE = './build/app.js'
var SOURCE_DIR = './src'

gulp.task( 'default', function(){
  // loads the server
  var localhost = server.new( SERVER_FILE );
  localhost.start();

  // re-execute the server file if any changes were made
  gulp.watch( SERVER_FILE, function(){
    localhost.start.bind( localhost )();
  })

  gulp.watch( 'job-controller.js', ['browserify'])
});

gulp.task( 'browserify', function(){
  gulp.src( SOURCE_DIR + 'job-controller.js' )
    .pipe( browserify({
      insertGlobals: true
    }) )
    .pipe( concat( CLIENT_FILE ) )
    .pipe( gulp.dest( './') )
})
