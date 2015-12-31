var ngRoute = require( 'angular-route');
var app = angular.module( 'database', ['ngRoute'] );

app.config( route );

function route ($routeProvider){
  $routeProvider
    .when( '/', {
      controller: JobController,
      templateUrl: './job.html'
    })
    .otherwise({
      redirectTo: '/'
    })
}
