'use strict'

var angular = require( 'angular' );

var app = angular.module( 'database', [
  require('angular-mocks/ngMock')
] );

//config
app.config( require('./app-config.js') );

//controllers
app.controller( 'JobController', require('./job-controller.js') );
app.controller( 'ModalController', require( './modal-controller.js'));
