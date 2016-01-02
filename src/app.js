'use strict'

var angular = require( 'angular' );
var ngResource = require( 'angular-resource');
var ngRoute = require( 'angular-route');
// var ngMock = require('angular-mocks');	

var app = angular.module( 'database', [
  // 'ngMock',
  'ngResource',
  'ngRoute'
] );

//config
require('./api-service.js')


//controllers
require('./job-controller.js')
// app.controller( 'ModalController', require( './modal-controller.js'));
