// SERVICES
weatherApp.service('cityService', function() {

  this.city = "Hamilton, NJ";

});

weatherApp.service('weatherService', ['$resource', function($resource) {
  this.GetWeather = function(city, days) {
    var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=f44bcfdb380db50074574a8d3888ef4c", {
      callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

      return weatherAPI.get({ q: city, cnt: days });
  };
}]);
