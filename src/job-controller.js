(function(){
	var applicationStatus = require( './application-status' );
	var app = angular.module('database');

	app.controller( 'JobController', ['$window', '$scope', '$q', '$routeParams', 'JobListAPI', JobController])

	function JobController( $scope, $window, $q, $routeParams){
		var view = this;
    	console.log($routeParams)
		this.jobId = $routeParams.jobId;
	}
})();