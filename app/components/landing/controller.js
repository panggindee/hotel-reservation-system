var app = angular.module('app', []);
function controller ($scope, $controller, $window, $http) {

  // create a blank object to hold our form information
  // $scope will allow this to pass between controller and view
  $scope.data={};
  $scope.data.pax='';
  $scope.data.balancepax='';
  $scope.data.samefloor=1;
  $scope.filter={};
  $scope.filter.room='';
  $scope.filter.floor='';
  $scope.filter.as=1;
  $scope.filter.ad=1;
  $scope.filter.ae=1;
  $scope.filter.rs=1;
  $scope.filter.rd=1;
  $scope.filter.re=1;
  $scope.alerts = [];
  $scope.rooms = [];
  $scope.cart = [];
  if($window.localStorage.rooms===undefined) {
    $window.localStorage.clear();
    console.log("initialise the rooms");
    pk=0;
    $scope.rooms = [
      {id:pk++, floor:"1",rm:"101",type:"studio", pax:1, avail:1},
      {id:pk++, floor:"1",rm:"102",type:"studio", pax:1, avail:1},
      {id:pk++, floor:"1",rm:"103",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"1",rm:"104",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"1",rm:"105",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"1",rm:"106",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"1",rm:"107",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"1",rm:"108",type:"executive", pax:4, avail:1},
      {id:pk++, floor:"1",rm:"109",type:"executive", pax:4, avail:1},
      {id:pk++, floor:"1",rm:"110",type:"executive", pax:4, avail:1},
      {id:pk++, floor:"2",rm:"201",type:"studio", pax:1, avail:1},
      {id:pk++, floor:"2",rm:"202",type:"studio", pax:1, avail:1},
      {id:pk++, floor:"2",rm:"203",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"2",rm:"204",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"2",rm:"205",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"2",rm:"206",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"2",rm:"207",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"2",rm:"208",type:"executive", pax:4, avail:1},
      {id:pk++, floor:"2",rm:"209",type:"executive", pax:4, avail:1},
      {id:pk++, floor:"2",rm:"210",type:"executive", pax:4, avail:1},
      {id:pk++, floor:"3",rm:"301",type:"studio", pax:1, avail:1},
      {id:pk++, floor:"3",rm:"302",type:"studio", pax:1, avail:1},
      {id:pk++, floor:"3",rm:"303",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"3",rm:"304",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"3",rm:"305",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"3",rm:"306",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"3",rm:"307",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"3",rm:"308",type:"executive", pax:4, avail:1},
      {id:pk++, floor:"3",rm:"309",type:"executive", pax:4, avail:1},
      {id:pk++, floor:"3",rm:"310",type:"executive", pax:4, avail:1},
      {id:pk++, floor:"4",rm:"401",type:"studio", pax:1, avail:1},
      {id:pk++, floor:"4",rm:"402",type:"studio", pax:1, avail:1},
      {id:pk++, floor:"4",rm:"403",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"4",rm:"404",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"4",rm:"405",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"4",rm:"406",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"4",rm:"407",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"4",rm:"408",type:"executive", pax:4, avail:1},
      {id:pk++, floor:"4",rm:"409",type:"executive", pax:4, avail:1},
      {id:pk++, floor:"4",rm:"410",type:"executive", pax:4, avail:1},
      {id:pk++, floor:"5",rm:"501",type:"studio", pax:1, avail:1},
      {id:pk++, floor:"5",rm:"502",type:"studio", pax:1, avail:1},
      {id:pk++, floor:"5",rm:"503",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"5",rm:"504",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"5",rm:"505",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"5",rm:"506",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"5",rm:"507",type:"deluxe", pax:2, avail:1},
      {id:pk++, floor:"5",rm:"508",type:"executive", pax:4, avail:1},
      {id:pk++, floor:"5",rm:"509",type:"executive", pax:4, avail:1},
      {id:pk++, floor:"5",rm:"510",type:"executive", pax:4, avail:1},
    ];
    $window.localStorage.rooms = JSON.stringify($scope.rooms);
  } else {
    $scope.rooms = $.parseJSON($window.localStorage.rooms);
  }
  $scope.filterRule = function(pax) {
    return $scope.data.balancepax==='' || $scope.data.balancepax>0 && ($scope.data.balancepax<=pax || $scope.data.balancepax>4);
  };
  $scope.filterFloor = function(floor) {
    return ($scope.filter.floor == '' || $scope.filter.floor==floor);
  };
  $scope.filterRoom = function(room) {
    return ($scope.filter.room === '' || $scope.filter.room==room);
  };
  $scope.updatePax = function() {
    $scope.data.balancepax = $scope.data.pax;
    $scope.cart = [];
  };
  $scope.updateFloor = function() {
    if(!$scope.data.samefloor) {
      $scope.filter.floor='';
    } else {
      if($scope.cart[0]!=undefined) {
        $scope.filter.floor=$scope.rooms[$scope.cart[0]].floor;
      }
    }
  };
  $scope.addToCart = function(index) {
    if($scope.cart.indexOf(index)==-1 && $scope.data.balancepax>0) {
      $scope.cart.push(index);
      $scope.data.balancepax -= $scope.rooms[index].pax;
      $scope.data.balancepax = ($scope.data.balancepax<0)?0:$scope.data.balancepax;
      if($scope.data.samefloor) {
        $scope.filter.floor=$scope.rooms[index].floor;
      }
      $scope.alerts = [];
      $scope.cart.sort();
    }
  };
  $scope.notInCart = function(index) {
    return ($scope.cart.indexOf(index)==-1);
  };
  $scope.removeFromCart = function(index) {
    $scope.cart.splice($scope.cart.indexOf(index), 1);
    $scope.data.balancepax += $scope.rooms[index].pax;
    $scope.updateFloor();
    $scope.alerts = [];
    $scope.cart.sort();
  };
  $scope.checkOutCart = function() {
    if($scope.data.balancepax==0) {
      angular.forEach($scope.cart, function(value){
  			$scope.rooms[value].avail=0;
  		});
      $window.localStorage.rooms = JSON.stringify($scope.rooms);
      $scope.cart=[];
    } else {
      $scope.alerts.push({type: 'alert radius', msg: "Unable to accomodate all pax"});
    }
  };
  $scope.cancelReservation = function(index) {
    $scope.rooms[index].avail=1;
    $window.localStorage.rooms = JSON.stringify($scope.rooms);
  };
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
  $scope.intialise = function() {
    $window.localStorage.clear();
    $window.location.reload();
  }
};
controller.$inject = ['$scope', '$controller', '$window', '$http'];
app.controller('LandingCtrl', controller);
