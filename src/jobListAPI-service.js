(function(){
  'use strict';

  var ngResource = require( 'angular-resource');
  var ngRoute = require( 'angular-route');  
  var app = angular.module('database' )

  app.factory('JobListAPI', function APIService( $resource ){
    return $resource( 
      '/jobs/', 
      { }, 
      {
        query: { method: "GET", isArray: true },
        create: { method: "POST" },
        remove: { method: "DELETE", url: '/jobs/remove/:jobId '},
        getJob: { method: "GET", url: '/jobs/info/:jobId'},
        updateJob: { method: "PUT", url: '/jobs/update/:jobId'}
      }
    );
  });
})()