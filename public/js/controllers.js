// CONTROLLERS

/*jshint esversion: 6 */

weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {

  $scope.city = cityService.city;

  $scope.$watch('city', function() {
    cityService.city = $scope.city;
  });

  $scope.submit = function() {
    $location.path('/weather');
  };

}]);

weatherApp.controller('weatherController', ['$scope', '$routeParams', 'cityService', 'weatherService', function($scope, $routeParams, cityService, weatherService) {

  $scope.city = cityService.city;

  $scope.days = $routeParams.days || '2';

  $scope.weatherResult = weatherService.GetWeather($scope.city, $scope.days);

  $scope.convertToFahrenheit = function(degK) {

    return Math.round((1.8 * (degK - 273)) + 32);

  };

  $scope.convertToDate = function(dt) {

    return new Date(dt * 1000);

  };

}]);

weatherApp.config(function ($firebaseRefProvider) {
  $firebaseRefProvider.registerUrl({
    default: config.databaseURL,
    object: `${config.databaseURL}/angular/object`
  });
});

weatherApp.factory('ObjectFactory', ObjectFactory);
weatherApp.controller('MyCtrl', MyCtrl);

function ObjectFactory($firebaseObject, $firebaseRef) {
  return $firebaseObject($firebaseRef.object);
}

  function MyCtrl(ObjectFactory) {
    this.object = ObjectFactory;
    this.sayHello = () => {
      return `Hello, ${this.object.name}`;
    };
  }

  const ctrl = new MyCtrl({ name: 'Alice' });
  const message = ctrl.sayHello();
  console.assert(message === 'Hello, Alice', `Expected: Hello, Alice - Actual ${message}`);
