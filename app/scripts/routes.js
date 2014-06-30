'use strict';

module.exports = function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/', {
    controller: require('./controllers/todoCtrl.js'),
    templateUrl: 'todomvc-index.html'
  }).when('/:status', {
    controller: require('./controllers/todoCtrl.js'),
    templateUrl: 'todomvc-index.html'
  }).otherwise({
    redirectTo: '/'
  });
};
