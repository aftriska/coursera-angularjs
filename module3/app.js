(function(){

'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);
// .directive('foundList', FoundList);

// function FoundList() {
//   var ddo = {
//     templateUrl: 'FoundList.html'
//   };
//
//   return ddo;
// }
//
// function FoundItems() {
//   var ddo = {
//     template: '{{ item.name }}'
//   };
//
//   return ddo;
// }

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundList.html',
    scope: {
      list: '<foundList',
      title: '@title'
    }
  }

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

  var menu = this;
  menu.searchTerm = "";

  menu.getMatchedMenuItems = function() {
    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

    promise.then(function (response) {
      // console.log(response);
      menu.found = response;
      menu.title = "Found " + response.length + " menu(s) with keyword '" + menu.searchTerm + "'.";
    })
    .catch(function (error) {
      console.log(error);
    })
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {

  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
    .then(function(response) {
      var menuItems = response.data.menu_items;
      var matchedItems = [];

      angular.forEach(menuItems, function(index){
        var itemDescription = index.name;

        if (itemDescription.toLowerCase().indexOf(searchTerm) !== -1) {
          // console.log(index);
          matchedItems.push(index);
        }
      });

      return matchedItems;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });

    return response;
  };
}

})();
