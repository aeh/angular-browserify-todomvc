'use strict';

require('angular/angular'); /* global angular */ // tell jshint angular exists
require('angular-route/angular-route');

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
angular.module('todomvc', ['ngRoute'])
  .factory('todoStorage', require('./services/todoStorage'))
  .directive('todoEscape', require('./directives/todoEscape'))
  .directive('todoFocus', require('./directives/todoFocus'))
  .config(require('./routes'));
