(function(){
  var app = angular.module( 'database', []);

  app.controller( 'JobController', ['$http', '$scope', JobController] );
  function JobController( $http, $scope ){

     getJobs();

     function getJobs(){
        $http.get( 'http://localhost:1200/jobs').success( function( response ){
           $scope.jobs = response;
        });
     }

     var view = this;
     view.addJob = addJob;
     view.deleteJob = deleteJob;
     view.NewJob = {};

     function addJob( data ){

        data.CreatedOn = new Date();
        data.Status = 'Application Submitted'

        var parameter = JSON.stringify( data );
  		$http.post( 'http://localhost:1200/jobs', parameter ).success( function( response ){
  			console.log( response );
  		});

        view.NewJob = {};
        getJobs();
     }


     function deleteJob( data ){
        var deleteUrl = "http://localhost:1200/jobs?objectId={id}"
        deleteUrl = deleteUrl.replace( '{id}', data._id );

        var parameter = JSON.stringify( data );

        $http.delete( deleteUrl ).success( function( response ){
           console.log( response );
        });

        getJobs();
     }
  }

})();
