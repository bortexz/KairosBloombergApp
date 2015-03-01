/**
 * Created by alberto on 1/3/15.
 */
angular.module('Bloomberg').factory('Utilities', function() {

  /**
   * Function that returns the data formatted to use with bloomberg API.
   * @param date Date() object
   * @returns {string} formatted into string in format yyyymmdd
   */
  function dateConverter(date) {
    var date_string = '';
    date_string += date.getFullYear();
    var month = date.getUTCMonth() + 1;
    date_string += month < 10 ? '0' + month : month;
    var day = date.getUTCDate();
    date_string += day < 10 ? '0' + day : day;

    return date_string;
  }

  return {
    dateConverter: dateConverter
  }
});