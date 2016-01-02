(function(){
  var applicatonStatus = require( './application-status' );
  var app = angular.module( 'database');

  app.controller( 'JobController', ['$window', '$scope', '$q', 'APIService', JobController] );

  function JobController( $scope, $window, $q, APIService ){
     var view = this;

     function updateJobList(){
       APIService.query().$promise.then( initializeJob );
     }

     view.submitJob = submitJob;
     view.deleteJob = deleteJob;
     view.editJob = editJob;
     view.setAddJobStatus = setAddJobStatus;
     view.isAddNewJob = isAddNewJob;
     view.resetJobDetail = resetJobDetail;
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
       var newJob = new APIService( {
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
         newJob.CreatedOn = view.JobDetail.CreatedOn;
         newJob.UpdatedOn = new Date();
         newJob.Status = view.JobDetail.Status;

         newJob.$update( {jobId: newJob.id} ).then(updateJobList);
       }

       resetJobDetail();
     }

     function isSuccess(){
       return view.success;
     }

     function setSuccess(){
       view.success = true;
     }

     function deleteJob( data ){
       console.log( data );
       var deleteJob = new APIService({
          jobId: data._id
       });
       deleteJob.$remove( {jobId: deleteJob.jobId} ).then(updateJobList);
     }

     function setJobLabel( job ){
       view.ApplicationStatus.forEach( function(element, index){
         if( element.Name == job.Status ) job.Style= element.Style
       } )
     }

     updateJobList();
  }
})();
