(function(){
  var ngResource = require( 'angular-resource');
  var app = angular.module( 'database', ['ngResource']);

  app.controller( 'JobController', ['$resource', '$http', '$scope', JobController] );

  function JobController( $resource, $http, $scope ){
     var view = this;

     var Jobs = $resource( '/jobs/:jobId', {jobId: '@jobId'} );

     Jobs.query( function( data ){
       $scope.JobLists = data;
     });

     view.JobLists = $scope.JobLists;

     view.addJob = addJob;
     view.deleteJob = deleteJob;
     view.NewJob = {};

     function addJob( data ){
       var newJob = new Jobs( {
         Company: data.Company,
         Title: data.Title,
         Status: 'Application Submitted',
         CreatedOn: new Date()
       });

       // send and reset data
       newJob.$save();
       data = {};
     }

     function deleteJob( data ){
       console.log( data );
       var deleteJob = new Jobs({
          jobId: data._id
       });

       deleteJob.$remove();
     }
  }
})();
