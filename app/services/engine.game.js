/**
 * Created by alberto on 1/3/15.
 */
angular.module('Bloomberg').service('GameEngine', function($q, Securities, GoogleNews, BloombergApi, Utilities, Charts) {

  var state = {
    punctuation: 0,
    current_clue: 0,
    max_clues: 15
  };

  function startGame() {
    state.punctuation = 0;
    state.current_clue_index = 0;
    state.clue_result = _.shuffle([1,2,3,4]);
    state.clue_data = [];

    return getNextClue();
  }

  function getNextClue() {
    var result = {};

    var q = $q.defer();
    //select first company
    var security = Securities.getRandomSecurity();
    //api call to get news

    GoogleNews.getNews(security).then(function(news) {
      //api call to get data
      result.security = security;
      result.news = _.slice(news, news.length - 4);

      var date_first_new = Utilities.dateConverter(new Date(result.news[0].date));
      var date_today = Utilities.dateConverter(new Date());
      //get date of the news, in order to make the request of historical data depending

      BloombergApi.get_historical_data_by_security(security, date_first_new, date_today).then(function(data) {
        //Get data formatted for charts
        data = JSON.parse(data);
        var arr = Charts.convertData(data);
        var random_arr = [];
        random_arr.push(Charts.randomizeData(arr));
        random_arr.push(Charts.randomizeData(arr));
        random_arr.push(Charts.randomizeData(arr));

        var return_array = [];
        var index = 0;
        for(var i = 0; i < 4; ++i) {
          if(state.clue_result[i] == 1) {
            return_array.push(arr);
          }else {
            return_array.push(random_arr[index]);
            index++;
          }
        }

        q.resolve(return_array);
      });
      //BloombergApi.get_historical_data_by_security()
    });

    return q.promise;
  }

  return {
    game_state: state,
    startGame: startGame,
    getNextClue: getNextClue
  }
});