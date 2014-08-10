var surface = document.getElementById("surface");

function newImage(width, height) {
  var image = document.createElement("canvas");
  image.width = width;
  image.height = height;
  image.ctx = image.getContext("2d");
  return {
    width: width,
    height: height,
    drawDot: function(x,y,r,g,b,a) {
      var data = image.ctx.createImageData(1,1);
      data.data[0] = r;
      data.data[1] = g;
      data.data[2] = b;
      data.data[3] = a;
      image.ctx.putImageData(data,x,y);
    },
    copyTo : function(context,x,y,targetWidth,targetHeight) {
      context.drawImage(image,0,0,width,height,x,y,targetWidth,targetHeight);
    }
  };
}
var image = newImage(200,200);

var scale = 8;

function drawSurface() {
  image.copyTo(surface.ctx,0,0,surface.width,surface.height);
}

function configureSurface() {
  surface.width = image.width * 4;
  surface.height = image.height * 4;
  surface.style.width = (image.width * scale) + "px";
  surface.style.height = (image.height * scale) + "px";
  surface.ctx = surface.getContext("2d");
  surface.ctx.imageSmoothingEnabled = false;
  drawSurface();
}

function previewShader(input) {
  var shader = input.value;
  var func;
  var s = "(function(width,height,x,y){\n" + shader + "\n})";
  try {
    func = eval(s);
    input.classList.remove("error");
  } catch(e) {
    console.log(e);
    input.classList.add("error");
    return;
  }
  var fix = function(val,def) {
    if( val === undefined ) {
      return def;
    } else {
      return val;
    }
  };
  for(var x=0; x<image.width; x++) {
    for(var y=0; y<image.height; y++) {
      var color = func(image.width,image.height,x,y) || {};
      image.drawDot(x,y,
        fix(color.r,0),
        fix(color.g,0),
        fix(color.b,0),
        255
      );
    }
  }
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
      return { id: ++cid, value: value };
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

  }
]);

function drawDot(x,y) {
  var parts = selected.color.value.match(/[0-9A-F]{2}/gi);
  r = parseInt(parts[0],16);
  g = parseInt(parts[1],16);
  b = parseInt(parts[2],16);
  a = 255;
  image.drawDot(x,y,r,g,b,a);
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
    var imageX = Math.floor(e.offsetX/scale);
    var imageY = Math.floor(e.offsetY/scale);
    drawDot(imageX,imageY);
  }
}
function canvasClick(e) {
  var imageX = Math.floor(e.offsetX/scale);
  var imageY = Math.floor(e.offsetY/scale);
  drawDot(imageX,imageY);
}
document.addEventListener('mouseup', endTrace);
surface.addEventListener('mouseout', endTrace);
surface.addEventListener('mousedown', beginTrace);
surface.addEventListener('mousemove', traceMove);
surface.addEventListener('click', canvasClick);
