/**
 * Created by alberto on 1/3/15.
 */
angular.module('Bloomberg').service('GameEngine', function($q, Securities, GoogleNews, BloombergApi, Utilities, Charts) {

  var state = {
    punctuation: 0,
    current_clue_index: 0,
    max_clues: 10,
    current_security: ''
  };

  function check(index) {

    if(state.clue_result[index-1] === 1) {
      state.punctuation++;
      return true;
    } else {
      return false;
    }
  }

  function startGame() {
    state.punctuation = 0;
    state.current_clue_index = 0;

    return getNextClue();
  }

  function getNextClue() {
    var result = {};
    state.current_clue_index++;
    state.clue_result = _.shuffle([1,2,3,4]);

    var q = $q.defer();
    //select first company
    var security = Securities.getRandomSecurity();
    //api call to get news
    BloombergApi.get_info_by_security(security).then(function(data){

      data = JSON.parse(data);
      if(data.data[0].results.length > 0) {
        var str = data.data[0].results[0].description;
        state.current_security_name = str.substring(0, str.length - '(Multiple Matched)'.length);
      }
      state.current_security = security;
      GoogleNews.getNews(security).then(function(news) {
        //api call to get data
        result.news = _.slice(news, news.length - 4);
        state.current_security = security;

        var dateFirstNew = new Date(result.news[0].date);
        var dateWeekAgo = new Date();
        dateWeekAgo.setDate(dateWeekAgo.getDate() - 7);


        var date_first_new = '';
        if(dateFirstNew < dateWeekAgo) {
          date_first_new = Utilities.dateConverter(dateFirstNew);
        } else {
          date_first_new = Utilities.dateConverter(dateWeekAgo);
        }

        //var date_first_new = Utilities.dateConverter(new Date(result.news[0].date));
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
          result.array_charts = return_array;
          q.resolve(result);
        });
        //BloombergApi.get_historical_data_by_security()
      });
    });

    return q.promise;
  }

  return {
    game_state: state,
    startGame: startGame,
    getNextClue: getNextClue,
    check: check
  }
});