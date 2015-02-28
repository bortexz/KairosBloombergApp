/**
 * Created by alberto on 1/3/15.
 */
angular.module('Bloomberg').service('GameEngine', function() {
  var state = {
    punctuation: 0,
    current_clue: 0,
    max_clues: 15
  };

  return {
    game_state: state
  }
});