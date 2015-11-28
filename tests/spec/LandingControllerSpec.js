describe("LandingCtrl", function() {
  var controller, scope;
  beforeEach(module('app'));
  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('LandingCtrl', {
      '$scope': scope
    });
  }));
  it("finding rm 101", function() {
    expect(scope.rooms[0].rm).toEqual("101");
  });
  it("test filter rule, true when no pax is requested", function() {
    scope.data.balancepax='';
    expect(scope.filterRule(1)).toEqual(true);
    expect(scope.filterRule(2)).toEqual(true);
    expect(scope.filterRule(4)).toEqual(true);
  });
  it("test filter rule, true when room pax can fit the request pax", function() {
    scope.data.balancepax='4';
    expect(scope.filterRule(1)).toEqual(false);
    expect(scope.filterRule(2)).toEqual(false);
    expect(scope.filterRule(4)).toEqual(true);
  });
  it("test filter rule, true when no room pax can fit the request pax", function() {
    scope.data.balancepax='5';
    expect(scope.filterRule(1)).toEqual(true);
    expect(scope.filterRule(2)).toEqual(true);
    expect(scope.filterRule(4)).toEqual(true);
  });
  it("test filter floor rule, true when no floor is request", function() {
    scope.filter.floor='';
    expect(scope.filterFloor(1)).toEqual(true);
    expect(scope.filterFloor(2)).toEqual(true);
    expect(scope.filterFloor(4)).toEqual(true);
  });
  it("test filter floor rule, true when floor 1 is request", function() {
    scope.filter.floor='1';
    expect(scope.filterFloor(1)).toEqual(true);
    expect(scope.filterFloor(2)).toEqual(false);
    expect(scope.filterFloor(4)).toEqual(false);
  });
  it("test filter room rule, true when no room is request", function() {
    scope.filter.room='';
    expect(scope.filterRoom(1)).toEqual(true);
    expect(scope.filterRoom(2)).toEqual(true);
    expect(scope.filterRoom(4)).toEqual(true);
  });
  it("test filter room rule, true when room 101 is request", function() {
    scope.filter.room=101;
    expect(scope.filterRoom(101)).toEqual(true);
    expect(scope.filterRoom(102)).toEqual(false);
    expect(scope.filterRoom(103)).toEqual(false);
  });
  it("test updating balance pax, true when no request pax", function() {
    scope.data.pax='';
    scope.data.balancepax=10;
    scope.updatePax()
    expect(scope.data.balancepax).toEqual('');
  });
  it("test updating balance pax, true when request pax is 5", function() {
    scope.data.pax='5';
    scope.data.balancepax=10;
    scope.updatePax()
    expect(scope.data.balancepax).toEqual('5');
  });
  it("test updating floor filter, true when room is 101, floor is 1", function() {
    scope.cart.push(0);
    scope.updateFloor();
    expect(scope.filter.floor).toEqual('1');
  });
  it("test uncheck same floor critera, true when floor selection is clear", function() {
    scope.data.samefloor=0;
    scope.updateFloor();
    expect(scope.filter.floor).toEqual('');
  });
  it("test add item to cart, true when add room 510, pax4 to cart, balance pax is 0", function() {
    scope.cart=[];
    scope.data.balancepax=4;
    scope.addToCart(49);
    expect(scope.rooms[scope.cart[0]].rm).toEqual('510');
    expect(scope.data.balancepax).toEqual(0);
  });
  it("test remove item from cart, true when add room 510, pax4 to cart, balance pax is 0", function() {
    scope.cart=[];
    scope.data.balancepax=4;
    scope.addToCart(49);
    scope.removeFromCart(49);
    expect(scope.cart.length).toEqual(0);
    expect(scope.data.balancepax).toEqual(4);
  });
  it("test checkout cart, true when add room 510 to cart, checkout and room 510 avail is 0", function() {
    scope.cart=[];
    scope.data.balancepax=4;
    scope.addToCart(49);
    scope.checkOutCart();
    expect(scope.cart.length).toEqual(0);
    expect(scope.rooms[49].avail).toEqual(0);
  });
  it("test cancel a room reservation, true when add room 510 to cart, checkout, cancel and room 510 avail is 1", function() {
    scope.cart=[];
    scope.data.balancepax=4;
    scope.addToCart(49);
    scope.checkOutCart();
    scope.cancelReservation(49);
    expect(scope.rooms[49].avail).toEqual(1);
  });
});
