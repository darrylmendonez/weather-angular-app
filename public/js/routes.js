// ROUTES

weatherApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
  .when('/', {
    templateUrl: 'partials/home.html',
    controller: 'homeController'
  })

  .when('/weather', {
    templateUrl: 'partials/weather.html',
    controller: 'weatherController'
  })

  .when('/weather/:days', {
    templateUrl: 'partials/weather.html',
    controller: 'weatherController'
  })

  .otherwise( {
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);

}]);
