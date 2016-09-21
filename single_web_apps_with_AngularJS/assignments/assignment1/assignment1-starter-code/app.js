(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope', '$filter'];
function LunchCheckController($scope, $filter) {
  $scope.items = [];
  $scope.stateOfLunch = "";
  $scope.inputBoxColor = "";
  $scope.msgColor = "";

  $scope.checkLunch = function () {  
    var items = $scope.items;
    if (items.length) {
        items = items.split(',').map(function (item){ return item.trim();}).filter(String);
        var numItems = items.length;
        (!numItems) ? setErrorView() : setSuccessView(numItems);
	} else {
	    setErrorView()
	} 
	
	function setErrorView() {
        $scope.msgColor = "red";
	    $scope.inputBoxColor = "red";
	    $scope.stateOfLunch = "Please enter data first";
    }
    
    function setSuccessView(numItems) {
       $scope.msgColor = "green";
	   $scope.inputBoxColor = "green";
	   ( numItems < 4 ) ? $scope.stateOfLunch = "Enjoy!"   
	                    : $scope.stateOfLunch = "Too much!";
    }
  };
}

})();