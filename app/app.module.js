//
// Copyright (c) 2015 by ITDEA (IT-Solutions) Pte Ltd. All Rights Reserved.
// Author: Pang Gin Dee
// Email: pang.gindee@itdea.biz
//
//https://github.com/vojtajina/ng-1.x-async-hack
var app = angular.module('app', [
  'ngRoute',
  // 'ngAnimate',
  'mm.foundation',
  'app.directive',
  'app.foundation',
  'app.service',
]);
app.constant('html5Mode', false);
// This is the hack,
// we store refs to $provide, so that we can add more stuff to it durind run-time.
var __$provide;
var __$controllerProvider;
//var enableHtml5 = CommonService.html5Mode();
function config ($routeProvider, $locationProvider, $provide, $controllerProvider, html5Mode) {
  __$provide = $provide;
  __$controllerProvider = $controllerProvider;

  $locationProvider.html5Mode({
    enabled: html5Mode,
    //requireBase: false
  });

  $routeProvider
  .when('/', {
    templateUrl: 'app/components/landing/view.html',
    controller: 'LandingCtrl',
    resolve: {
      svc: 'CommonService',
      ctrl: lazyLoad('app/components/landing/controller.min.js')
    }
  })
  .otherwise({
    redirectTo: '/'
  });
}
// After all the initial-code has been loaded,
// patch angular.module to use the stored $provide.
// We could avoid patching angular.module and use some other API,
// such as angular.lazyModule(), but this makes it easier to load any module lazily.
angular.module = function() {
  return {
    service: function(name, constructor) {
      __$provide.service(name, constructor);
      return this;
    },
    controller: function(name, constructor) {
      __$controllerProvider.register(name, constructor);
      return this;
    }
  };
};
var __alreadyLoading = {};
function lazyLoad(path) {
  return function($q) {
    if (!__alreadyLoading[path]) {
      var d = $q.defer();
      var s = document.createElement('script');
      s.src = path;
      s.onload = function() {
        d.resolve();
      };
      document.body.appendChild(s);
      __alreadyLoading[path] = d.promise;
    }
    return __alreadyLoading[path];
  };
}
//default controller
app.controller('DefaultCtrl', function($scope, html5Mode, CommonService) {
  $scope.hash = CommonService.toHash(html5Mode);
  $scope.date = new Date();
  $scope.timestamp = CommonService.timeStamp();
});
//footer controller
app.controller('FooterCtrl', function() {
  this.date = new Date();
});
app.config(config);
