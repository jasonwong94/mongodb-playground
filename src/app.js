'use strict'

var angular = require( 'angular' );

var app = angular.module( 'database', [] );

app.controller( 'JobController', require('./job-controller.js') );
