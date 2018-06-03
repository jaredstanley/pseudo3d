var colorsArr = [
  {name: 'darkwarm', values:['152930', '0D1C0E', 'EBC335', 'F2461C', 'D72827', 'D72827']},
  {name: 'pinks', values:['FF540D', 'E82C0C', 'EE0000', 'E80C7A', 'FF0DFF', '992222']},
  {name: 'rainbow', values:['58C1DA', '30A135', 'EBC335', 'F2461C', 'D72827', 'CCCCCC']},
  {name: 'blackblue', values:['333333', '666666','66F2EB']},
  {name: 'yellows', values:['99F2E9', 'F2E85E', '736834', 'F2DD72', 'A6953F']}
];
var curColArray;
var main_context, main_canvas, canvasHeight, canvasWidth, centerW, centerH;
var lens,
shapes = [],
count = 0,
radius = 633,
centerZ = 400,
coilHeight = 3000,
numShapes = 633;
var text, gui;



window.onload = function(){
  start();
}

function start() {
  main_canvas = document.getElementById("c");
  main_context = main_canvas.getContext("2d");
  canvasHeight = main_canvas.height;
  canvasWidth = main_canvas.width;
  centerH = canvasHeight/2;
  centerW = canvasWidth/2;
  main_context.translate(centerW,centerH);
  //

text = new uiControls();
gui = new dat.GUI();
  initGUI();
  initShapes();
  initTimer();


}

//
function initShapes(){
  for (var i = 0; i < numShapes; i++) {
    var _angle = (Math.PI*2/60)*i;
    shapes[i] = {
      angle: _angle,
      radius: Math.random()*12,
      baseX:0,
      baseZ:0,
      y:((coilHeight/2)-coilHeight/numShapes*i)/5,
      color:randColor()
    } 
  }
}
//
function initTimer() {
  window.requestAnimationFrame(initTimer);
  update();
}

function update() {
   main_context.clearRect(-canvasWidth/2,-canvasHeight/2,canvasWidth, canvasHeight);
  
  for (var i = 0; i < shapes.length; i++) {
    var itm = shapes[i];
    itm.x = Math.cos(itm.angle+count)*radius;
    itm.z = centerZ+Math.sin(itm.angle+count)*radius;
    var perspective = lens/(lens+itm.z);
    main_context.save();
    main_context.scale(perspective,perspective);
    main_context.translate(itm.x, itm.y);
    
    main_context.fillStyle = itm.color;
    // main_context.strokeStyle = itm.color;
   //
    main_context.beginPath();
    main_context.arc(0, 0, itm.radius, 0, Math.PI * 2, true);
    // main_context.stroke();
    main_context.fill();
    main_context.restore();

    count+=(numShapes*.000000014);
  
  }
  shapes.sort(zSort);
    
}

function zSort(cardA, cardB){
  return cardB.z - cardA.z;
}


function randColor() {
if(curColArray==undefined){
  var rnd = Math.floor(Math.random()*colorsArr.length)
  curColArray = colorsArr[rnd].values;
}
  var num = Math.floor(Math.random() * curColArray.length);
  var string = curColArray[num];
  return "#" + string;
}

var uiControls = function() {
  this.message = 'params';
  this.speed = 0.8;
  this.lens = 600;
  // this.displayOutline = false;
  // this.explode = function() {  };
  
};

function initGUI(){
  gui.add(text, 'message');
  gui.add(text, 'lens', 10, 2000);
  // console.log(lens);
  // gui.add(text, 'displayOutline');
  // gui.add(text, 'explode');
}
