/**
 * Created by alberto on 28/2/15.
 */
angular.module('Bloomberg').factory('BloombergApi', function($q) {

  var https = require('https');
  var fs = require('fs');

  function get_historical_data_by_security(security, from, to) {
    var q = $q.defer();

    var host = "http-api.openbloomberg.com";
    var port = 443;

    var options = {
      host: host,
      port: port,
      path: '/request?ns=blp&service=refdata&type=HistoricalDataRequest',
      method: 'POST',
      key: fs.readFileSync('api_keys/khacks_spring_2015_009.key'),
      cert: fs.readFileSync('api_keys/khacks_spring_2015_009.crt'),
      ca: fs.readFileSync('api_keys/bloomberg.crt')
    };

    var data = '';

    var req = https.request(options, function(res) {
      //console.log("statusCode: ", res.statusCode);
      //console.log("headers: ", res.headers);

      res.on('data', function(d) {
        //console.log(d.toString());
        data += d.toString();
      });

      res.on('end', function(d) {
        q.resolve(data);
      });
    });

    req.write(JSON.stringify({
      "securities": [security + " US Equity"],
      "fields": ["PX_LAST", "OPEN", "EPS_ANNUALIZED"],
      "startDate": from || "20150201",
      "endDate": to || "20150301",
      "periodicitySelection": "DAILY"
    }));
    req.end();

    req.on('error', function(e) {
      console.error(e);
    });

    return q.promise;
  }

  function get_info_by_security(security) {
    var q = $q.defer();
    var host = "http-api.openbloomberg.com";
    var port = 443;

    var options = {
      host: host,
      port: port,
      path: '/request?ns=blp&service=instruments&type=instrumentListRequest',
      method: 'POST',
      key: fs.readFileSync('api_keys/khacks_spring_2015_009.key'),
      cert: fs.readFileSync('api_keys/khacks_spring_2015_009.crt'),
      ca: fs.readFileSync('api_keys/bloomberg.crt')
    };

    var data = '';

    var req = https.request(options, function(res) {

      res.on('data', function(d) {
        //console.log(d.toString());
        data += d.toString();
      });

      res.on('end', function(d) {
        q.resolve(data);
      });
    });

    req.write(JSON.stringify( {
      "query": security,
      "yellowKeyFilter": "YK_FILTER_CORP",
      "languageOverride": "LANG_OVERRIDE_NONE",
      "maxResults": 10
    }));
    req.end();

    req.on('error', function(e) {
      console.error(e);
    });

    return q.promise;
  }

  return {
    get_historical_data_by_security: get_historical_data_by_security,
    get_info_by_security: get_info_by_security
  }

});