/**
 * Created by alberto on 28/2/15.
 */
angular.module('Bloomberg',['ngMaterial', 'ui.router']).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('main', {
    url:'/main',
    templateUrl:'main/main.html',
    controller:'mainCtrl'
  })
    .state('main.start', {
      url:'/start',
      templateUrl: 'start/start.html',
      controller: 'startCtrl'
    })
    .state('main.game', {
      url: '/game',
      templateUrl: 'game/game.html',
      controller: 'gameCtrl'
    });

  $urlRouterProvider.otherwise('/main/start');
});
