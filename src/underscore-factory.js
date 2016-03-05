var app = angular.module('database');

var _ = require('underscore');

app.factory('_', ['$window', function($window){
	$window._ = _;
	return $window._;
}])