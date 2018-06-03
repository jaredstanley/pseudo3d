var colorsArr = [
  {name: 'darkwarm', values:['152930', '0D1C0E', 'EBC335', 'F2461C', 'D72827', 'D72827']},
  {name: 'pinks', values:['FF540D', 'E82C0C', 'EE0000', 'E80C7A', 'FF0DFF', '992222']},
  {name: 'rainbow', values:['58C1DA', '30A135', 'EBC335', 'F2461C', 'D72827', 'CCCCCC']},
  {name: 'blackblue', values:['333333', '666666','66F2EB']},
  {name: 'yellows', values:['99F2E9', 'F2E85E', '736834', 'F2DD72', 'A6953F']}
];
var curColArray;
var main_context, main_canvas, canvasHeight, canvasWidth, centerW, centerH;
lens = 200,
shapes = [],
numShapes = 1111;


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
  initShapes();
  // addListeners();
  initTimer();


}
//
function initShapes(){
  for (var i = 0; i < numShapes; i++) {
    shapes[i] = {
      x:(Math.random()-Math.random())*2000,
      y:(Math.random()-Math.random())*2000,
      z:(Math.random())*5555,
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
   // main_context.clearRect(-canvasWidth/2,-canvasHeight/2,canvasWidth, canvasHeight);
  
  for (var i = 0; i < shapes.length; i++) {
    var itm = shapes[i];
    var perspective = lens/(lens+itm.z);
    main_context.save();
    main_context.scale(perspective,perspective);
    main_context.translate(itm.x, itm.y);
    
    // main_context.fillStyle = "rgba(200,200,255,"+(.3-(itm.z/10000))+")";
    main_context.fillStyle = itm.color;
    if(i==0){
      // console.log((1-(itm.z/10000)));
    }

    main_context.beginPath();
    main_context.arc(0, 0, 2, 0, Math.PI * 2, true);
    // main_context.fillRect(-100,-80,200,160);
    main_context.fill();
    main_context.restore();

    itm.z-=25;
    if(itm.z <0){
      itm.z = 5555;
      itm.x = (Math.random()-Math.random())*2000;
      itm.y = (Math.random()-Math.random())*2000;
    }
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

