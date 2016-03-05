var app = angular.module( 'database');

app.config( route );

function route ($routeProvider){
  $routeProvider
    .when( '/', {
		controller: 'JobListController',
		templateUrl: './jobLists.html'
    })
    .when( '/jobs/:jobId', {
    	controller: 'JobController',
    	templateUrl: './jobDetails.html'
    })
    .otherwise({
		redirectTo: './jobs.html'
    })
}
