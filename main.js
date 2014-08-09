var surface = document.getElementById("surface");

function newImage(width, height) {
  image = document.createElement("canvas");
  image.width = width;
  image.height = height;
  image.ctx = image.getContext("2d");
  return image;
}
var image = newImage(200,200);

var scale = 8;

function drawSurface() {
  surface.ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, surface.width, surface.height);
}

function configureSurface() {
  surface.width=scale*image.width;
  surface.height=scale*image.height;
  surface.ctx = surface.getContext("2d");
  surface.ctx.imageSmoothingEnabled = false;
  drawSurface();
}

configureSurface();

function zoomIn() {
  scale *= 2;
  configureSurface();
}

function zoomOut() {
  scale /= 2;
  configureSurface();
}

document.getElementById('zoomin').addEventListener('click',zoomIn);
document.getElementById('zoomout').addEventListener('click',zoomOut);

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

function drawDot(x,y) {
  var data = image.ctx.createImageData(1,1);
  var parts = selected.color.value.match(/[0-9A-F]{2}/gi);
  data.data[0] = parseInt(parts[0],16);
  data.data[1] = parseInt(parts[1],16);
  data.data[2] = parseInt(parts[2],16);
  data.data[3] = 255;
  image.ctx.putImageData(data,x,y);
  drawSurface();
}

var buttonDown = false;
function beginTrace(){
  buttonDown = true;
}
function endTrace() {
  buttonDown = false;
}
function traceMove(e) {
  if(buttonDown) {
    var imageX = Math.floor((e.offsetX/surface.width) * image.width);
    var imageY = Math.floor((e.offsetY/surface.height) * image.height);
    drawDot(imageX,imageY);
  }
}
function canvasClick(e) {
  var imageX = Math.floor((e.offsetX/surface.width) * image.width);
  var imageY = Math.floor((e.offsetY/surface.height) * image.height);
  drawDot(imageX,imageY);
}
document.addEventListener('mouseup', endTrace);
surface.addEventListener('mouseout', endTrace);
surface.addEventListener('mousedown', beginTrace);
surface.addEventListener('mousemove', traceMove);
surface.addEventListener('click', canvasClick);
