(function(){
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var showList = this;

  showList.emptyBuy = ShoppingListCheckOffService.emptyBuy;
  showList.items = ShoppingListCheckOffService.getToBuy();

  showList.boughtItem = function (itemIndex) {
    ShoppingListCheckOffService.addBoughtItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var showList = this;
  showList.emptyBought = ShoppingListCheckOffService.emptyBought;
  showList.items = ShoppingListCheckOffService.getBought();

}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuy = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate",
      quantity: "5"
    },
    {
      name: "Chips",
      quantity: "5"
    }
  ];

  var bought = [];

  service.getToBuy = function () {
    return toBuy;
  };

  service.getBought = function () {
    return bought;
  };

  service.emptyBought = function () {
    if(bought.length === 0) {
      return true;
    } else { return false; }
  };

  service.emptyBuy = function () {
    if(toBuy.length === 0) {
      return true;
    } else { return false; }
  };

  service.addBoughtItem = function (itemIndex) {
    bought.push(toBuy[itemIndex]);
    toBuy.splice(itemIndex, 1);
  };
}

})();
