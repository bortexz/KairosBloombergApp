/**
 * Created by alberto on 1/3/15.
 */
angular.module('Bloomberg').service('GameEngine', function(BloombergApi) {
  var state = {
    punctuation: 0,
    current_clue: 0,
    max_clues: 15
  };

  function startGame() {
    state.punctuation = 0;
    state.current_clue = 0;
  }

  function getNextClue() {
    //select first company

    //api call to get data

    //api call to get
  }

  return {
    game_state: state
  }
});