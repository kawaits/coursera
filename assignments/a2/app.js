(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.provider('ShoppingListService', ShoppingListServiceProvider)
.config(Config);

Config.$inject = ['ShoppingListServiceProvider'];
function Config(ShoppingListServiceProvider) {
  ShoppingListServiceProvider.defaults.maxItems = 2;
}


ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(ShoppingListService) {
  var tb = this
  tb.items = ShoppingListService.getToBuyItems();
  console.log("ToBuyController: items: " + JSON.stringify(tb.items));
  
  tb.removeItem = function (itemIndex) {
      ShoppingListService.addItem(itemIndex);
      ShoppingListService.removeItem(itemIndex);
  };
  
}

AlreadyBoughtController.$inject = ['ShoppingListService'];
function AlreadyBoughtController(ShoppingListService) {
    var ab = this;
      
    ab.items = ShoppingListService.getBoughtItems();
}

function ShoppingListService(options) {
  var service = this
      , toBuyItems = options.toBuyItems
      , tbiInitialLength = toBuyItems.length
      , boughtItems = [];

  service.addItem = function (itemIndex) {
      if (toBuyItems.length) {
           boughtItems.push(toBuyItems[itemIndex]);
      } else {
          throw new Error("Everything is bought!");
      }   
  };

  service.removeItem = function (itemIndex) {
      if (  (tbiInitialLength !== undefined)   && 
             (boughtItems.length <= tbiInitialLength)  ) {
          toBuyItems.splice(itemIndex, 1);
      } else {
          throw new Error("Nothing bought yet.");
    }   
  };

  service.getToBuyItems = function () {
      return toBuyItems;
  };
  
  service.getBoughtItems = function () {
      return boughtItems;
  };
 
}


function ShoppingListServiceProvider() {
  var provider = this;

  provider.defaults = {
      maxItems: 10,
      toBuyItems: [
          { name: "cookies", quantity: 2 },
          { name: "milk", quantity: 10 },
          { name: "sugar", quantity: 4 },
          { name: "chocolate", quantity: 6 },
          { name: "rice", quantity: 1 }
      ]
  };

  provider.$get = function () {
      var shoppingList = new ShoppingListService(provider.defaults);
      return shoppingList;
  };
}

})();
