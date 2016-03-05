'use strict'

var angular = require( 'angular' );
var ngResource = require( 'angular-resource');
var ngRoute = require( 'angular-route');
// var ngMock = require('angular-mocks');	

var applicatonStatus = require( './application-status' );

var app = angular.module( 'database', [
  // 'ngMock',
  'ngResource',
  'ngRoute'
] );

//underscore
require('./underscore-factory.js')

//controller
require('./job-controller.js')
require('./jobList-controller.js')

//route configuration
require('./app-config.js')

//service
require('./JobListAPI-service.js')