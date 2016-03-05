(function(){
	var applicationStatus = require( './application-status' );
	var app = angular.module('database');

	app.controller( 'JobController', ['$window', '$scope', '$q', '$routeParams', 'JobListAPI', JobController])

	function JobController( $scope, $window, $q, $routeParams, JobListAPI){
		var view = this;
		view.getJob = getJob;
		this.jobId = $routeParams.jobId;

		function getJob(){
			JobListAPI.getJob( {jobId: view.jobId} ).$promise.then(setInfo)
		}

		function setInfo(data){
			view._id = data._id;
			view.Title = data.Title;
			view.Company = data.Company;
			view.Status = data.Status;
		}

		getJob();
	}
})();