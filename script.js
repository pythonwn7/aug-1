const startButton =
document.getElementById("start-button");


const openingScreen =
document.getElementById("opening-screen");


const gardenScreen =
document.getElementById("garden-screen");


const message =
document.getElementById("message");


const canvas =
document.getElementById("garden");


const ctx =
canvas.getContext("2d");



function resizeCanvas(){

    canvas.width =
    window.innerWidth;

    canvas.height =
    window.innerHeight;

}


resizeCanvas();


window.addEventListener(
"resize",
resizeCanvas
);



const hibiscusColors = [

"#ff6b35",
"#ff82cb",
"#ff4d6d",
"#fff1dc"

];





startButton.onclick = function(){


    openingScreen.classList.add("hidden");


    gardenScreen.classList.remove("hidden");


    startBouquet();


};







function startBouquet(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



const centerX =
canvas.width / 2;


const bottomY =
canvas.height * .92;



let branches = [];



const amount = 13;



for(
let i=0;
i<amount;
i++
){


let spread =
(i/(amount-1))-.5;



branches.push({

curve:
spread *
(
300+
Math.random()*180
),


height:
300+
Math.random()*230,


size:
25+
Math.random()*18,


color:
hibiscusColors[
Math.floor(
Math.random()
*
hibiscusColors.length
)
]

});


}




branches.sort(
()=>Math.random()-0.5
);



branches.forEach(
(branch,index)=>{


setTimeout(()=>{


growStem(

centerX,
bottomY,
branch.curve,
branch.height,
branch.size,
branch.color,
0

);



},index*450+Math.random()*700);



});



setTimeout(()=>{


message.classList.remove("hidden");


},8000);



}









function growStem(
startX,
startY,
curve,
height,
size,
color,
progress
){



if(progress>=1){


setTimeout(()=>{


drawHibiscus(

startX+curve,
startY-height,
size,
color

);



},200+Math.random()*200);



return;

}







let t=progress;



let x =
startX+
curve*
(
.2*t+
.8*Math.pow(t,1.5)
);



let y =
startY-height*t;



let oldT =
Math.max(0,t-.02);



let oldX =
startX+
curve*
(
.2*oldT+
.8*Math.pow(oldT,1.5)
);



let oldY =
startY-height*oldT;





drawStem(
oldX,
oldY,
x,
y
);





if(
progress>.3 &&
progress<.85 &&
Math.random()>.997
){

drawLeaf(
x,
y,
curve
);

}





if(
progress>.7 &&
Math.random()>.997
){


drawHibiscus(

x,
y-12,
size*.32,
color

);


}






requestAnimationFrame(()=>{


growStem(

startX,
startY,
curve,
height,
size,
color,
progress+.004

);


});



}









function drawStem(
x1,
y1,
x2,
y2
){


ctx.beginPath();


ctx.moveTo(
x1,
y1
);


ctx.lineTo(
x2,
y2
);


ctx.strokeStyle =
"#245b32";


ctx.lineWidth =
5;


ctx.lineCap =
"round";


ctx.stroke();


}









function drawLeaf(
x,
y,
curve
){


ctx.save();


ctx.translate(
x,
y
);



ctx.rotate(
curve>0?.7:-.7
);



ctx.beginPath();



ctx.ellipse(
0,
0,
3,
7,
0,
0,
Math.PI*2
);



ctx.fillStyle =
"#3d8038";


ctx.fill();



ctx.restore();


}









function drawHibiscus(
x,
y,
size,
color
){



ctx.save();



ctx.translate(
x,
y
);



for(
let i=0;
i<5;
i++
){


ctx.save();


ctx.rotate(
i*Math.PI*2/5
);



ctx.beginPath();


ctx.ellipse(

0,
-size*.55,
size*.42,
size,
0,
0,
Math.PI*2

);



ctx.fillStyle =
color;


ctx.fill();



ctx.restore();



}




ctx.beginPath();


ctx.arc(
0,
0,
size*.23,
0,
Math.PI*2
);



ctx.fillStyle =
"#ffd166";


ctx.fill();



ctx.restore();



}