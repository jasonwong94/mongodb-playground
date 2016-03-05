(function(){
  var applicatonStatus = require( './application-status' );
  var app = angular.module( 'database');

  app.controller( 'JobListController', ['$window', '$scope', '$q', 'JobListAPI', JobListController] );

  function JobListController( $scope, $window, $q, JobListAPI ){
     var view = this;

     function updateJobList(){
       JobListAPI.query().$promise.then( initializeJob );
     }

     view.submitJob = submitJob;
     view.deleteJob = deleteJob;
     view.initializeJob = initializeJob;
     view.updateJobList = updateJobList;
     view.setJobLabel = setJobLabel;
     view.isSuccess = isSuccess;

     view.ApplicationStatus = applicatonStatus.status;
     view.JobDetail = {};
     view.Success = false;
     view.NewJob = false;

     function initializeJob( data ){
       view.JobLists = data;
       view.JobLists.forEach(setJobLabel)
     }

     function submitJob(){
       var newJob = new JobListAPI( {
         Company: view.JobDetail.Company,
         Title: view.JobDetail.Title,
       });
       // send and reset data
       newJob.Status = 'Application Submitted';
       newJob.CreatedOn = new Date();

       newJob.$save().then(updateJobList);

       view.JobDetail = {};
     }

     function isSuccess(){
       return view.success;
     }

     function setSuccess(){
       view.success = true;
     }

     function deleteJob( data ){
      JobListAPI.remove( {jobId: data._id} ).$promise.then(updateJobList)
     }

     function setJobLabel( job ){
       view.ApplicationStatus.forEach( function(element, index){
         if( element.Name == job.Status ) job.Style= element.Style
       } )
     }

     updateJobList();
  }
})();
