const startButton = document.getElementById("start-button");

const openingScreen = document.getElementById("opening-screen");
const gardenScreen = document.getElementById("garden-screen");

const canvas = document.getElementById("garden");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});



startButton.addEventListener("click", function () {

    openingScreen.classList.add("hidden");

    gardenScreen.classList.remove("hidden");

    startGarden();

});




// Store flower positions so they don't overlap

let flowers = [];



function startGarden() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    flowers = [];


    const plantCount = 7;


    const spacing =
        canvas.width / plantCount;



    for (let i = 0; i < plantCount; i++) {


        let x =
            spacing * i + spacing / 2;


        // slight randomness but controlled

        x += Math.random() * 40 - 20;



        growPlant(
            x,
            canvas.height,
            -Math.PI / 2 + (Math.random() - 0.5) * 0.25,
            130 + Math.random() * 80,
            0
        );

    }

}




function growPlant(
    x,
    y,
    angle,
    length,
    depth
) {


    if (length < 25 || depth > 3) {


        createFlower(
            x,
            y
        );


        return;

    }



    let endX =
        x + Math.cos(angle) * length;


    let endY =
        y + Math.sin(angle) * length;



    drawBranch(
        x,
        y,
        endX,
        endY
    );




    let branches = 1;


    if (Math.random() > 0.45) {

        branches = 2;

    }



    for (
        let i = 0;
        i < branches;
        i++
    ) {


        growPlant(

            endX,
            endY,

            angle +
            (Math.random() - 0.5) * 0.35,

            length * 0.65,

            depth + 1

        );

    }


}





function drawBranch(
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
        "#285943";


    ctx.lineWidth = 3;


    ctx.stroke();

}





function createFlower(
    x,
    y
) {


    // prevent overlapping flowers

    for (let flower of flowers) {


        let distance =
            Math.hypot(
                flower.x - x,
                flower.y - y
            );


        if (distance < 55) {

            return;

        }

    }



    flowers.push({

        x:x,

        y:y,

        size:
            12 + Math.random() * 12

    });



    drawFlower(
        x,
        y,
        flowers[flowers.length - 1].size
    );

}





function drawFlower(
    x,
    y,
    size
) {


    const colors = [

        "#ff6b6b",
        "#ff8c42",
        "#ffb3c6",
        "#fff5e1"

    ];



    const color =
        colors[
            Math.floor(
                Math.random()
                *
                colors.length
            )
        ];



    for (
        let i = 0;
        i < 5;
        i++
    ) {


        let angle =
            (Math.PI * 2 / 5)
            *
            i;



        let px =
            x +
            Math.cos(angle)
            *
            size
            *
            0.5;



        let py =
            y +
            Math.sin(angle)
            *
            size
            *
            0.5;



        ctx.beginPath();



        ctx.ellipse(

            px,

            py,

            size * 0.45,

            size,

            angle,

            0,

            Math.PI * 2

        );



        ctx.fillStyle =
            color;


        ctx.fill();

    }



    ctx.beginPath();


    ctx.arc(

        x,

        y,

        size * 0.25,

        0,

        Math.PI * 2

    );


    ctx.fillStyle =
        "#ffd166";


    ctx.fill();

}