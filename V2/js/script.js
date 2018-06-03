var colorsArr = [
  {name: 'darkwarm', values:['152930', '0D1C0E', 'EBC335', 'F2461C', 'D72827', 'D72827']},
  {name: 'pinks', values:['FF540D', 'E82C0C', 'EE0000', 'E80C7A', 'FF0DFF', '992222']},
  {name: 'rainbow', values:['58C1DA', '30A135', 'EBC335', 'F2461C', 'D72827', 'CCCCCC']},
  {name: 'blackblue', values:['333333', '666666','66F2EB']},
  {name: 'yellows', values:['99F2E9', 'F2E85E', '736834', 'F2DD72', 'A6953F']}
];
var ltr = "blakc as the pit from pole to pole";
var ltrArr = ltr.split("");
var curColArray;
var main_context, main_canvas, canvasHeight, canvasWidth, centerW, centerH;
lens = 200,
shapes = [],
count = 0,
radius = 333,
centerZ = 200,
coilHeight = 6000,
numShapes = 833;


window.onload = function(){
  start();
  main_canvas.addEventListener("mousemove", movemove, false);
     
}
function movemove(e){
  radius = e.clientX;
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
    main_context.strokeStyle = itm.color;
   //
    main_context.beginPath();
    // main_context.arc(0, 0, itm.radius, 0, Math.PI * 2, true);
    main_context.fillText(ltrArr[i%ltrArr.length], 110, 66);
    // main_context.fillText("E", 110, 66);
    // main_context.fillRect(-10,-10, 20, 20);
    main_context.stroke();
    // main_context.fill();
    main_context.restore();

    count+=(numShapes*.000000004);
  
  }
  shapes.sort(zSort);
    
}

function zSort(cardA, cardB){
  // return cardB.z - cardA.z;
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



