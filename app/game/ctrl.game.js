/**
 * Created by alberto on 1/3/15.
 */
angular.module('Bloomberg').controller('gameCtrl', function($scope, GameEngine) {
  $scope.game_state = GameEngine.game_state;


});