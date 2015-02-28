/**
 * Created by alberto on 28/2/15.
 */
angular.module('Bloomberg').controller('startCtrl', function($scope, $state, BloombergApi) {
  $scope.startGame = function() {
    $state.go('main.game');
  };

  BloombergApi.make_request();
});