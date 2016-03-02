var app = angular.module( 'database' );

app.config( route );

function route ($routeProvider){
  $routeProvider
    .when( '/', {
      controller: JobController,
      templateUrl: './jobLists.html'
    })
    .otherwise({
      redirectTo: '/'
    })
}
