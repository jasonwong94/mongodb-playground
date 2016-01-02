(function(){
  'use strict';

  var ngResource = require( 'angular-resource');
  var ngRoute = require( 'angular-route');  
  var app = angular.module('database', ['ngResource'] )

  app.factory('APIService', function APIService( $resource ){
    return $resource( 
      '/jobs/', 
      { }, 
      {
        query: { method: "GET", isArray: true },
        create: { method: "POST" },
        get: { method: "GET" },
        update: { method: "PUT", url: '/jobs/update/:jobId' },
        remove: { method: "DELETE", url: '/jobs/remove/:jobId '}
      }
    );
  });
})()