/**
 * Created by alberto on 28/2/15.
 */
angular.module('Bloomberg').controller('mainCtrl',function(){

}).controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function() {
    $mdSidenav('left').close()
      .then(function(){
        $log.debug("close LEFT is done");
      });
  };
});