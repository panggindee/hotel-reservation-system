//
// Copyright (c) 2015 by ITDEA (IT-Solutions) Pte Ltd. All Rights Reserved.
// Author: Pang Gin Dee
// Email: pang.gindee@itdea.biz
//
//common functions goes here
var app = angular.module('app.service', []);
app.factory("CommonService", service);
function service ($http) {
  return {
    //define a loop range for ng repeat
    range: function(min, max, step) {
      step = step || 1;
      var input = [];
      for (var i = min; i <= max; i += step) input.push(i);
      return input;
    },
    //toggle state
    toggle: function(state) {
      if(state) {
        state = false;
      } else {
        state = true;
      }
      return state;
    },
    book: function(pax, type) {

    },
    unbook: function(index) {

    },
    timeStamp: function() {
      return new Date().getTime()/1000;
    },
    toHash: function(html5Mode) {
      return (html5Mode)?'':'#/';
    }
  };
}
service.$inject = ['$http'];
app.factory("CommonService", service);
