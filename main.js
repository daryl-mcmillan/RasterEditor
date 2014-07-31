var module = angular.module('drawinator', []);

module.controller('ColorPicker',[
  '$scope', function($scope) {
    
    var cid = 0;
    var color = function(value) {
      cid ++;
      return { id: 'c' + cid, label: 'color ' + cid, value: value };
    };
    
    $scope.colors = [
      color("#000000"),
      color("#FFFFFF"),
      color("#FF0000"),
      color("#00FF00"),
      color("#0000FF"),
      color("#FFFF00"),
      color("#00FFFF"),
      color("#FF00FF"),
      color("#996666"),
      color("#669966"),
      color("#666699"),
      color("#666666"),
      color("#999999"),
      color("#CCCCCC")
    ];
    
    $scope.selected = { color: $scope.colors[0] };
    
    $scope.test = "my test value";
  }
]);
