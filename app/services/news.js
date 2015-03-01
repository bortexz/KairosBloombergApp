/**
 * Created by alberto on 1/3/15.
 */
angular.module('Bloomberg').factory('GoogleNews', function($q) {

  function getNews(security) {

    var q = $q.defer();

    var news = require('google-finance');
    news.companyNews({
      symbol: 'NASDAQ:' + security
    }, function (err, news) {
      q.resolve(news);
    });

    return q.promise;
  }

  return {
    getNews: getNews
  }
});