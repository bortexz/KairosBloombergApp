/**
 * Created by alberto on 1/3/15.
 */
angular.module('Bloomberg').controller('gameCtrl', function($scope, GameEngine) {
  //$scope.game_state = GameEngine.game_state;
  GameEngine.startGame().then(function(dataChart) {
    console.log(dataChart);

    var chart_0 = c3.generate({
      bindto: '#chart_0',
      data: {
        columns: [
          dataChart[0]
        ]
      }
    });
    var chart_1 = c3.generate({
      bindto: '#chart_1',
      data: {
        columns: [
          dataChart[1]
        ]
      }
    });
    var chart_2 = c3.generate({
      bindto: '#chart_2',
      data: {
        columns: [
          dataChart[2]
        ]
      }
    });
    var chart_3 = c3.generate({
      bindto: '#chart_3',
      data: {
        columns: [
          dataChart[3]
        ]
      }
    });
  });

});