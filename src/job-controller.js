(function(){
  var ngResource = require( 'angular-resource');
  var ngRoute = require( 'angular-route');
  var applicatonStatus = require( './application-status' );
  var app = angular.module( 'database', ['ngResource', 'ngRoute']);

  app.controller( 'JobController', ['$resource', '$window', '$http', '$scope', '$q', JobController] );

  function JobController( $resource, $http, $scope, $window, $q ){
     var view = this;

     var Jobs = $resource( '/jobs/', {}, {
       query: { method: "GET", isArray: true },
       create: { method: "POST" },
       get: { method: "GET" },
       update: { method: "PUT", url: '/jobs/update/:jobId' },
       remove: { method: "DELETE", url: '/jobs/remove/:jobId '}
     })
    //  var Jobs = $resource( '/jobs/:jobId', {jobId: '@jobId'} );
     function updateJobList(){
       Jobs.query().$promise.then( initializeJob );
     }

     view.submitJob = submitJob;
     view.deleteJob = deleteJob;
     view.editJob = editJob;
     view.setAddJobStatus = setAddJobStatus;
     view.isAddNewJob = isAddNewJob;
     view.resetJobDetail = resetJobDetail;

     view.ApplicationStatus = applicatonStatus.status;
     view.JobDetail = {};
     view.Success = false;
     view.NewJob = false;

     function initializeJob( data ){
       view.JobLists = data;
     }

     function editJob( id ){
       view.JobDetail = view.JobLists.find( function(element, index){
         if(element._id == id)
          return element;
       } );
       setAddJobStatus( false );
       console.log(view.JobDetail);
     }

     function setAddJobStatus( flag ){
       view.AddNewJob = flag;
     }

     function isAddNewJob(){
       return view.AddNewJob;
     }

     function resetJobDetail(){
       view.JobDetail = {};
       setAddJobStatus( false );
     }

     function submitJob(){
       var newJob = new Jobs( {
         Company: view.JobDetail.Company,
         Title: view.JobDetail.Title,
       });

       if( view.AddNewJob ){
         // send and reset data
         newJob.Status = 'Application Submitted';
         newJob.CreatedOn = new Date();

         newJob.$save().then(updateJobList);
       } else {
         newJob.id = view.JobDetail._id;
         newJob.UpdatedOn = new Date();
         newJob.Status = view.JobDetail.Status;

         newJob.$update( {jobId: newJob.id} ).then(updateJobList);
       }

       resetJobDetail();
     }

     function setSuccess(){
       view.success = true;
     }

     function deleteJob( data ){
       console.log( data );
       var deleteJob = new Jobs({
          jobId: data._id
       });
       deleteJob.$remove( {jobId: deleteJob.jobId} ).then(updateJobList);
     }

     updateJobList();
  }
})();
