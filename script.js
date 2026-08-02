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




// colors

const hibiscusColors = [

    "#ff6b35",
    "#ff8fab",
    "#ff4d6d",
    "#fff1dc"

];



let bouquetFlowers = [];





function startBouquet() {


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    bouquetFlowers = [];


    const centerX =
        canvas.width / 2;


    const bottomY =
        canvas.height * 0.9;



    const flowerCount =
        9;



    for (
        let i = 0;
        i < flowerCount;
        i++
    ) {


        let spread =
            (i / (flowerCount - 1))
            - 0.5;



        let angle =
            -Math.PI / 2
            +
            spread * 1.3
            +
            (Math.random() - .5) * .25;



        let height =
            170
            +
            Math.random() * 130;



        let size =
            22
            +
            Math.random() * 18;



        let color =
            hibiscusColors[
                Math.floor(
                    Math.random()
                    *
                    hibiscusColors.length
                )
            ];



        growStem(

            centerX,

            bottomY,

            angle,

            height,

            size,

            color,

            0

        );


    }


}





function growStem(
    x,
    y,
    angle,
    length,
    size,
    color,
    progress
) {


    if (progress >= 1) {


        let flowerDistance =
            25
            +
            Math.random() * 25;



        let fx =
            x
            +
            Math.cos(angle)
            *
            flowerDistance;



        let fy =
            y
            +
            Math.sin(angle)
            *
            flowerDistance;



        drawHibiscus(
            fx,
            fy,
            size,
            color
        );


        return;

    }



    let nextX =
        x
        +
        Math.cos(angle)
        *
        length
        *
        0.04;



    let nextY =
        y
        +
        Math.sin(angle)
        *
        length
        *
        0.04;



    drawStem(
        x,
        y,
        nextX,
        nextY
    );



    if (
        Math.random() > .92
    ) {

        drawLeaf(
            nextX,
            nextY,
            angle
        );

    }



    requestAnimationFrame(
        function () {

            growStem(
                nextX,
                nextY,
                angle,
                length,
                size,
                color,
                progress + .04
            );

        }
    );

}





function drawStem(
    x1,
    y1,
    x2,
    y2
) {


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
        "#286b35";


    ctx.lineWidth =
        4;


    ctx.stroke();

}





function drawLeaf(
    x,
    y,
    angle
) {


    ctx.save();


    ctx.translate(
        x,
        y
    );


    ctx.rotate(
        angle
        +
        Math.PI / 2
    );


    ctx.beginPath();


    ctx.ellipse(
        0,
        0,
        8,
        20,
        0,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "#3d8b40";


    ctx.fill();


    ctx.restore();

}





function drawHibiscus(
    x,
    y,
    size,
    color
) {


    ctx.save();


    ctx.translate(
        x,
        y
    );


    let rotation =
        Math.random()
        *
        Math.PI
        *
        2;


    ctx.rotate(rotation);



    // petals

    for (
        let i = 0;
        i < 5;
        i++
    ) {


        let angle =
            (Math.PI * 2 / 5)
            *
            i;



        ctx.save();


        ctx.rotate(
            angle
        );



        ctx.beginPath();


        ctx.ellipse(

            0,

            -size * .55,

            size * .45,

            size,

            0,

            0,

            Math.PI * 2

        );



        ctx.fillStyle =
            color;


        ctx.globalAlpha =
            .9;


        ctx.fill();


        ctx.restore();

    }



    // center

    ctx.globalAlpha = 1;


    ctx.beginPath();


    ctx.arc(
        0,
        0,
        size * .25,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "#ffd166";


    ctx.fill();



    // hibiscus stamen

    ctx.beginPath();


    ctx.moveTo(
        0,
        0
    );


    ctx.lineTo(
        0,
        size * .8
    );


    ctx.strokeStyle =
        "#e63946";


    ctx.lineWidth =
        3;


    ctx.stroke();



    ctx.restore();

}