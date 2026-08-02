const startButton = document.getElementById("start-button");

const openingScreen = document.getElementById("opening-screen");
const gardenScreen = document.getElementById("garden-screen");

const canvas = document.getElementById("garden");
const ctx = canvas.getContext("2d");


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);



startButton.addEventListener("click", function () {

    openingScreen.classList.add("hidden");

    gardenScreen.classList.remove("hidden");

    startBouquet();

});



const hibiscusColors = [

    "#ff6b35",
    "#ff8fab",
    "#ff4d6d",
    "#fff1dc"

];





function startBouquet() {

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



    const flowers = 11;



    for (
        let i = 0;
        i < flowers;
        i++
    ) {


        let side =
            (i / (flowers - 1)) - .5;



        let curve =
            side *
            (Math.random() * 120 + 80);



        let height =
            230 +
            Math.random() * 180;



        let size =
            24 +
            Math.random() * 18;



        let color =
            hibiscusColors[
                Math.floor(
                    Math.random()
                    *
                    hibiscusColors.length
                )
            ];



        growCurvedStem(
            centerX,
            bottomY,
            curve,
            height,
            size,
            color,
            0
        );

    }

}






function growCurvedStem(
    startX,
    startY,
    curve,
    height,
    size,
    color,
    progress
) {


    if(progress >= 1) {


        let topX =
            startX + curve;


        let topY =
            startY - height;



        drawHibiscus(
            topX,
            topY,
            size,
            color
        );


        return;

    }



    let t =
        progress;



    // curved upward path

    let x =
        startX
        +
        curve *
        Math.pow(t, 1.8);



    let y =
        startY
        -
        height *
        t;



    let previousT =
        Math.max(
            0,
            t - .04
        );



    let previousX =
        startX
        +
        curve *
        Math.pow(previousT,1.8);



    let previousY =
        startY
        -
        height *
        previousT;



    drawStem(
        previousX,
        previousY,
        x,
        y
    );



    if(
        Math.random() > .94
    ){

        drawLeaf(
            x,
            y,
            curve
        );

    }



    requestAnimationFrame(
        function(){

            growCurvedStem(
                startX,
                startY,
                curve,
                height,
                size,
                color,
                progress + .025
            );

        }
    );

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
        "#276b38";


    ctx.lineWidth =
        4;


    ctx.lineCap =
        "round";


    ctx.stroke();

}





function drawLeaf(
    x,
    y,
    angle
){

    ctx.save();


    ctx.translate(
        x,
        y
    );


    ctx.rotate(
        Math.atan(angle / 100)
    );


    ctx.beginPath();


    ctx.ellipse(
        0,
        0,
        10,
        24,
        0,
        0,
        Math.PI*2
    );


    ctx.fillStyle =
        "#438f45";


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


    ctx.rotate(
        Math.random()
        *
        Math.PI
        *
        2
    );



    for(
        let i=0;
        i<5;
        i++
    ){

        ctx.save();


        ctx.rotate(
            i *
            Math.PI*2/5
        );


        ctx.beginPath();


        ctx.ellipse(
            0,
            -size*.55,
            size*.48,
            size,
            0,
            0,
            Math.PI*2
        );


        ctx.fillStyle =
            color;


        ctx.globalAlpha =
            .92;


        ctx.fill();


        ctx.restore();

    }




    // flower center

    ctx.globalAlpha =
        1;


    ctx.beginPath();


    ctx.arc(
        0,
        0,
        size*.28,
        0,
        Math.PI*2
    );


    ctx.fillStyle =
        "#ffd166";


    ctx.fill();



    ctx.restore();

}