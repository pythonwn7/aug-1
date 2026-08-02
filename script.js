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
        canvas.height * .93;


    const flowers = 13;



    for(
        let i = 0;
        i < flowers;
        i++
    ){


        let spread =
            (i / (flowers - 1)) - .5;



        let curve =
            spread *
            (
                280 +
                Math.random() * 100
            );



        let height =
            280 +
            Math.random() * 190;



        let size =
            22 +
            Math.random() * 15;



        let color =
            hibiscusColors[
                Math.floor(
                    Math.random()
                    *
                    hibiscusColors.length
                )
            ];



        // different branches finish at different times

        let startDelay =
            i * 250 +
            Math.random()*700;



        setTimeout(
            function(){

                growCurvedStem(
                    centerX,
                    bottomY,
                    curve,
                    height,
                    size,
                    color,
                    0
                );

            },
            startDelay
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
){


    if(progress >= 1){


        setTimeout(
            function(){

                drawHibiscus(
                    startX + curve,
                    startY - height,
                    size,
                    color
                );

            },

            500 +
            Math.random()*2200

        );


        return;

    }





    let t =
        progress;



    let x =
        startX
        +
        curve *
        (
            .25*t +
            .75*Math.pow(t,1.5)
        );



    let y =
        startY
        -
        height*t;





    let oldT =
        Math.max(
            0,
            t-.025
        );



    let oldX =
        startX
        +
        curve *
        (
            .25*oldT +
            .75*Math.pow(oldT,1.5)
        );



    let oldY =
        startY
        -
        height*oldT;





    // fewer smaller leaves

    if(
        Math.random() > .985
    ){

        drawLeaf(
            x,
            y,
            curve
        );

    }





    // stem first

    drawStem(
        oldX,
        oldY,
        x,
        y
    );





    // small blooms on top of branches

    if(
        progress > .68 &&
        Math.random() > .994
    ){


        let smallSize =
            size *
            (
                .25 +
                Math.random()*.15
            );



        let smallColor =
            hibiscusColors[
                Math.floor(
                    Math.random()
                    *
                    hibiscusColors.length
                )
            ];



        drawHibiscus(
            x,
            y,
            smallSize,
            smallColor
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
                progress + .005
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
        curve > 0 ? .7 : -.7
    );


    ctx.beginPath();


    ctx.ellipse(
        0,
        0,
        4,
        9,
        0,
        0,
        Math.PI*2
    );



    ctx.fillStyle =
        "#438f45";



    ctx.globalAlpha =
        .85;



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
        Math.PI*2
    );



    for(
        let i = 0;
        i < 5;
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
            size*.45,
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





    ctx.globalAlpha = 1;



    ctx.beginPath();


    ctx.arc(
        0,
        0,
        size*.25,
        0,
        Math.PI*2
    );



    ctx.fillStyle =
        "#ffd166";


    ctx.fill();



    ctx.restore();

}