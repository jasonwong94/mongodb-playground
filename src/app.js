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
require('./jobListAPI-service.js')


//controllers
require('./jobList-controller.js')
// app.controller( 'ModalController', require( './modal-controller.js'));
