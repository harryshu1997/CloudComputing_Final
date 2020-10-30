
function setup(){
var myCanvas;
var myContext;
var slider;
var movetoR = 0;

function drawHello(){
    var ctx = myCanvas.getContext('2d');
    ctx.font = "30px Arial";
    ctx.strokeText("Welcome to My World", movetoR, 50);
    movetoR = (movetoR + 2)%myCanvas.width;
    //window.requestAnimationFrame(drawHello);
   };

function moveToTx(loc,Tx)
{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); myContext.moveTo(res[0],res[1]);}

function lineToTx(loc,Tx)
{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); myContext.lineTo(res[0],res[1]);}

function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
    myContext.strokeStyle=color;
    myContext.beginPath();
    moveToTx(C(t_begin),Tx);
    for(var i=1;i<=intervals;i++){
        var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
        lineToTx(C(t),Tx);
    }
    myContext.stroke();
}

function drawTrajectoryObj(t_begin,t_end,intervals,C,Tx,color) {
    myContext.strokeStyle=color;
    myContext.beginPath();
    moveToTx(C(t_begin),Tx);
    for(var i=1;i<=intervals;i++){
        var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
        lineToTx(C(t),Tx);
    }
    myContext.stroke();
}

 //draw big axes to show 
 function drawBigAxes(color,Tx) {
    
    myContext.strokeStyle=color;
    myContext.beginPath();
    // Axes
    moveToTx([120,0],Tx);lineToTx([0,0],Tx);lineToTx([0,120],Tx);
    // Arrowheads
    moveToTx([110,5],Tx);lineToTx([120,0],Tx);lineToTx([110,5],Tx);
    moveToTx([5,110],Tx);lineToTx([0,120],Tx);lineToTx([-5,110],Tx);
    // X-label
    moveToTx([130,0],Tx);lineToTx([140,10],Tx);
    moveToTx([130,10],Tx);lineToTx([140,0],Tx);
    myContext.stroke();
    
}

//draw small axes to show 
function drawSmallAxes(color,Tx) {
    myContext.strokeStyle=color;
    myContext.beginPath();
    // Axes
    moveToTx([1.20,0],Tx);lineToTx([0,0],Tx);lineToTx([0,1.20],Tx);
    // Arrowheads
    moveToTx([1.10,.05],Tx);lineToTx([1.20,0],Tx);lineToTx([1.10,-.05],Tx);
    moveToTx([.05,1.10],Tx);lineToTx([0,1.20],Tx);lineToTx([-.05,1.10],Tx);
    // X-label
    moveToTx([1.30,0],Tx);lineToTx([1.40,.10],Tx);
    moveToTx([1.30,.10],Tx);lineToTx([1.40,0],Tx);
    // Y-Lable
    moveToTx([-0.2,1.30],Tx);lineToTx([-0.1,1.20],Tx);
    moveToTx([0,1.30],Tx);lineToTx([-0.1,1.20],Tx);
    moveToTx([-0.1,1.20],Tx);lineToTx([-0.1,1.1],Tx);
    myContext.stroke();
    
}

var Hermite = function(t) {
    return [
    2*t*t*t-3*t*t+1,
    t*t*t-2*t*t+t,
    -2*t*t*t+3*t*t,
    t*t*t-t*t
    ];
}

var HermiteDerivative = function(t) {
        return [
    6*t*t-6*t,
    3*t*t-4*t+1,
    -6*t*t+6*t,
    3*t*t-2*t
        ];
}

function Cubic(basis,P,t){
    var b = basis(t);
    var result=vec2.create();
    vec2.scale(result,P[0],b[0]);
    vec2.scaleAndAdd(result,result,P[1],b[1]);
    vec2.scaleAndAdd(result,result,P[2],b[2]);
    vec2.scaleAndAdd(result,result,P[3],b[3]);
    return result;
}

var p0=[1,0];
var d0=[-2,1];
var p1=[0.5,1.5];
var d1=[1,0];
var p2=[1,1];
var d2=[0,-1];
var d2x = [0,1];
var p3=[1.5,1.5];
var d3=[1,0];
var p4=[1,0];
var d4=[-2,-1];


var P0 = [p0,d0,p1,d1];
var P1 = [p1,d1,p2,d2];
var P2 = [p2,d2x,p3,d3];
var P3 = [p3,d3,p4,d4];


var C0 = function(t){return Cubic(Hermite,P0,t);};
var C1 = function(t){return Cubic(Hermite,P1,t);};
var C2 = function(t){return Cubic(Hermite,P2,t);};
var C3 = function(t){return Cubic(Hermite,P3,t);};

var C0Prime = function(t){return Cubic(HermiteDerivative,P0,t);};
var C1Prime = function(t){return Cubic(HermiteDerivative,P1,t);};
var C2Prime = function(t){return Cubic(HermiteDerivative,P2,t);};
var C3Prime = function(t){return Cubic(HermiteDerivative,P3,t);};

var Ccomp = function(t){
    if(t<1){
        var u = t;
        return C0(u);
    }else if(t>= 1 && t < 2){
        var u = t-1;
        return C1(u);
    }else if(t>= 2 && t < 3){
        var u = t-2;
        return C2(u);
    }else{
        var u = t-3;
        return C3(u);
    }
}

var CcompPrime = function(t){
    if(t<1){
        var u = t;
        return C0Prime(u);
    }else if(t>= 1 && t < 2){
        var u = t-1;
        return C1Prime(u);
    }else if(t>= 2 && t < 3){
        var u = t-2;
        return C2Prime(u);
    }else{
        var u = t-3;
        return C3Prime(u);
    }
}

function drawObj(color,Tx){

    myContext.fillStyle = color;
    myContext.beginPath();
    drawTrajectoryObj(0.0,1.0,100,C0,Tx,"red");
    drawTrajectoryObj(0.0,1.0,100,C1,Tx,"blue");
    drawTrajectoryObj(0.0,1.0,100,C2,Tx,"orange");
    drawTrajectoryObj(0.0,1.0,100,C3,Tx,"red");
    myContext.closePath();
    myContext.fill();
}


//function to draw the animation
function draw(){
    var speed = slider.value * 0.01;
    myContext.clearRect(0, 0, myCanvas.width, myCanvas.height);
    
    var draw_to_canvas = mat3.create();
    //mat3.fromTranslation(draw_to_canvas,[50,50]);
   // drawBigAxes("grey",draw_to_canvas);
    mat3.fromTranslation(draw_to_canvas,[200,350]);
    mat3.scale(draw_to_canvas,draw_to_canvas,[150,-150]); // Flip the Y-axis
   // drawSmallAxes("red",draw_to_canvas);
    drawTrajectory(0.0,1.0,100,C0,draw_to_canvas,"red");
    drawTrajectory(0.0,1.0,100,C1,draw_to_canvas,"blue");
    drawTrajectory(0.0,1.0,100,C2,draw_to_canvas,"orange");
    drawTrajectory(0.0,1.0,100,C3,draw_to_canvas,"red");

    var obj_to_axe= mat3.create();
    var tangent = CcompPrime(speed);
    var angle = Math.atan2(tangent[1],tangent[0]);
    mat3.fromTranslation(obj_to_axe,Ccomp(speed));
    var obj_to_canvas = mat3.create();
    mat3.scale(obj_to_axe,obj_to_axe,[0.1,0.1]);
    mat3.rotate(obj_to_axe,obj_to_axe,90);
    mat3.rotate(obj_to_axe,obj_to_axe,angle);
    mat3.multiply(obj_to_canvas, draw_to_canvas, obj_to_axe);
    
    drawObj("red",obj_to_canvas);
    drawHello();
    
    time++;
    if(time % 20 == 0){
        slider.stepUp();
        slider.value = slider.value % 400;
    }

    window.requestAnimationFrame(draw);
}

// set up the elements
myCanvas = document.getElementById('myCanvas');
myContext = myCanvas.getContext('2d');
slider = document.getElementById("slider");
slider.value = 0;
var time = 1;
//slider.addEventListener("input",draw);
draw();
}
//start the program
window.onload=setup;

