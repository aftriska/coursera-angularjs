(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.lunchMenu = "";
  $scope.checkerMessage = "";

  $scope.displayMessage = function () {
    var totalAmount = getTotalAmount($scope.lunchMenu);
    if(totalAmount === 0) {
      $scope.checkerMessage = "Please enter data first";
    } else if (totalAmount < 4) {
      $scope.checkerMessage = "Enjoy!";
    } else if (totalAmount > 3){
      $scope.checkerMessage = "Too much!";
    }
  };

  function getTotalAmount(string) {
    if(string === "")
    {
      return 0;
    } else {
      var lunchAmount = string.split(",").length;
      return lunchAmount;
    }
  }
};

})();
