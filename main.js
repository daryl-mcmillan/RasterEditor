function newImage(width, height) {
  image = document.createElement("canvas");
  image.width = width;
  image.height = height;
  image.ctx = image.getContext("2d");
  return image;
}
var image = newImage(200,200);

var scale = 4;

var surface = document.getElementById("surface");
surface.ctx = surface.getContext("2d");
surface.ctx.mozImageSmoothingEnabled = false;
surface.ctx.webkitImageSmoothingEnabled = false;
surface.ctx.msImageSmoothingEnabled = false;
surface.ctx.imageSmoothingEnabled = false;

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

function canvasMove(e) {
  
}

function canvasClick(e) {
  var imageX = Math.floor((e.offsetX/surface.width) * image.width);
  var imageY = Math.floor((e.offsetY/surface.height) * image.height);
  var data = image.ctx.createImageData(1,1);
  var parts = selected.color.value.match(/[0-9A-F]{2}/gi);
  data.data[0] = parseInt(parts[0],16);
  data.data[1] = parseInt(parts[1],16);
  data.data[2] = parseInt(parts[2],16);
  data.data[3] = 255;
  image.ctx.putImageData(data,imageX,imageY);
  //console.log([image,0,0,image.width,image.height,surface.width,surface.height]);
  //ctx.putImageData(image, 0, 0, image.width, image.height, surface.width, surface.height);
  surface.ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, surface.width, surface.height);
  //ctx.drawImage(image, 0, 0);
}