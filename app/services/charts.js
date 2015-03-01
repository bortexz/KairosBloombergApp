/**
 * Created by alberto on 1/3/15.
 */
angular.module('Bloomberg').factory('Charts', function() {
  function convertData(data) {
    //console.log(data[0]);
    var arr = data.data[0].securityData.fieldData;
    var result = [];
    for(var i = 0; i < arr.length; i++) {
      result.push(arr[i].OPEN);
      result.push(arr[i].PX_LAST);
    }
    return result;
  }

  //Receives an array of values
  function randomizeData(data) {
    var result = [];
    for(var i = 0; i < data.length; ++i) {
      if(i == 0) {
        result.push(Math.round((data[i] + Math.random()*6 - 3)*100) / 100);
      } else {
        result.push(Math.round((result[i-1] + Math.random()*6 - 3) * 100)  / 100);
      }
    }
    return result;
  }

  return {
    convertData: convertData,
    randomizeData: randomizeData
  }
});