/**
 * Created by alberto on 28/2/15.
 */
angular.module('Bloomberg').controller('startCtrl', function($scope, $state, GoogleNews, BloombergApi, Charts) {
  $scope.startGame = function() {
    $state.go('main.game');
  };

  //BloombergApi.make_request();
  //BloombergApi.get_securities_by_letter();
  //Securities.getRandomSecurity();
  BloombergApi.get_historical_data_by_security('AAPL').then(function(data) {


    var result = Charts.convertData(JSON.parse(data))
    console.log('result');
    console.log(result);
    console.log('randomize');
    console.log(Charts.randomizeData(result));
  });
});