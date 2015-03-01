/**
 * Created by alberto on 1/3/15.
 */
angular.module('Bloomberg').service('GameEngine', function($scope, $q, Securities) {

  var state = {
    punctuation: 0,
    current_clue: 0,
    max_clues: 15
  };

  function startGame() {
    state.punctuation = 0;
    state.current_clue = 0;
    return getNextClue();
  }

  function getNextClue() {
    var q = $q.defer();
    //select first company

    //api call to get news

    //api call to get data




    return q.promise;
  }

  return {
    game_state: state
  }
});