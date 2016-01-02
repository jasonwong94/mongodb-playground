var app = angular.module( 'database' );

app.config( route );

function route ($routeProvider){
  $routeProvider
    .when( '/', {
      controller: JobController,
      templateUrl: './jobs.html'
    })
    .otherwise({
      redirectTo: '/'
    })
}
