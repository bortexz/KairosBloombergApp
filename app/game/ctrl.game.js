/**
 * Created by alberto on 1/3/15.
 */
angular.module('Bloomberg').controller('gameCtrl', function($scope, GameEngine, $mdDialog) {
  $scope.game_state = GameEngine.game_state;

  $scope.spinner = true;

  $scope.selected = function(index) {
    var winn = GameEngine.check(index);

    if(winn) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('SUCCESS!')
          .content('You got this one right!!')
          .ok('NEXT')
      ).then(function(){
        getNextClue();
      });
    } else {
      $mdDialog.show(
        $mdDialog.alert()
          .title('Oops...')
          .content('This isn\'t the real chart')
          .ok('NEXT')
      ).then(function(){
          getNextClue();
        });
    }

  };

  function getNextClue() {
    $scope.spinner = true;
    GameEngine.getNextClue().then(function(dataGame) {
      $scope.spinner = false;
      printState(dataGame)
    })
  }

  function printState(dataGame) {
    var dataChart = dataGame.array_charts;
    $scope.news = dataGame.news;
    console.log(dataGame.news[0]);

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
  }

  GameEngine.startGame().then(function(dataGame) {
    $scope.spinner = false;
      printState(dataGame);
  });

  $scope.spinner = true;
});