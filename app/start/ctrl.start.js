/**
 * Created by alberto on 28/2/15.
 */
angular.module('Bloomberg').controller('startCtrl', function($scope, $state, BloombergApi, Securities) {
  $scope.startGame = function() {
    $state.go('main.game');
  };

  //BloombergApi.make_request();
  //BloombergApi.get_securities_by_letter();
  //Securities.getRandomSecurity();
  Securities.getNews();
});