(function(){
  'use strict';

  var ngResource = require( 'angular-resource');
  var ngRoute = require( 'angular-route');  
  var app = angular.module('database', ['ngResource'] )

  app.factory('JobListAPI', function APIService( $resource ){
    return $resource( 
      '/jobs/', 
      { }, 
      {
        query: { method: "GET", isArray: true },
        create: { method: "POST" },
        remove: { method: "DELETE", url: '/jobs/remove/:jobId '},
      }
    );
  });
})()