/**
 * Created by alberto on 28/2/15.
 */
angular.module('Bloomberg').factory('BloombergApi', function() {

  function make_request() {
    var https = require('https');
    var fs = require('fs');

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
      console.log("statusCode: ", res.statusCode);
      console.log("headers: ", res.headers);

      res.on('data', function(d) {
        //console.log(d.toString());
        data += d.toString();
      });

      res.on('end', function(d) {
        console.log(JSON.parse(data));
      });
    });

    req.write(JSON.stringify( {
      "securities": ["IBM US Equity", "AAPL US Equity"],
      "fields": ["PX_LAST", "OPEN", "EPS_ANNUALIZED"],
      "startDate": "20120101",
      "endDate": "20120301",
      "periodicitySelection": "DAILY"
    }));
    req.end();

    req.on('error', function(e) {
      console.error(e);
    });
  }

  return {
    make_request: make_request
  }

});