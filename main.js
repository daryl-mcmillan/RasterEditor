var module = angular.module('drawinator', []);

module.controller('ColorPicker',[
  '$scope', function($scope) {
    
    var cid = 0;
    var color = function(value) {
      cid ++;
      return { id: 'c' + cid, label: 'color ' + cid, value: value };
    };
    
    $scope.colors = [
      color("#000"),
      color("#FFF"),
      color("#F00"),
      color("#0F0"),
      color("#00F"),
      color("#FF0"),
      color("#0FF"),
      color("#F0F"),
      color("#966"),
      color("#696"),
      color("#669"),
      color("#666"),
      color("#999"),
      color("#CCC")
    ];
    
    $scope.selected = { color: $scope.colors[0] };
    
    $scope.test = "my test value";
  }
]);
