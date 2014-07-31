var surface = document.getElementById("surface");
var ctx = surface.getContext("2d");
var selected = {}

var module = angular.module('drawinator', []);

module.controller('ColorPicker',[
  '$scope', function($scope) {

    var cid = 0;
    var color = function(value) {
      cid ++;
      return {
        id: 'c' + cid,
        label: 'color ' + cid,
        value: value
      };
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
    
    $scope.selected = selected;
    selected.color = $scope.colors[0];
    
    $scope.test = "my test value";
  }
]);

function canvasClick(e) {
  var parts = selected.color.value.match(/[0-9A-F]{2}/g)
  var x = e.offsetX;
  var y = e.offsetY;
  var data = ctx.getImageData(x, y, 1, 1);
  data.data[0] = parseInt(parts[0],16);
  data.data[1] = parseInt(parts[1],16);
  data.data[2] = parseInt(parts[2],16);
  data.data[3] = 255;
  ctx.putImageData(data, x, y);
}