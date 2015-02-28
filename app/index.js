/**
 * Created by alberto on 28/2/15.
 */
angular.module('Bloomberg',['ngMaterial', 'ui.router']).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('main', {
    url:'/main',
    templateUrl:'main/main.html',
    controller:'mainCtrl'
  })
    .state('main.home', {
      url:'/home',
      templateUrl: 'home/home.html',
      controller: 'homeCtrl'
    });

  $urlRouterProvider.otherwise('/main/home');
});
