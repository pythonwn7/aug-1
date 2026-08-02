console.log("script loaded");
const startButton = document.getElementById("start-button");

const openingScreen = document.getElementById("opening-screen");
const gardenScreen = document.getElementById("garden-screen");

const canvas = document.getElementById("garden");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


startButton.addEventListener("click", function () {

    openingScreen.classList.add("hidden");
    gardenScreen.classList.remove("hidden");

    startGarden();

});


function startGarden() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    growPlant(
        canvas.width / 2,
        canvas.height,
        -Math.PI / 2,
        150
    );

}



function growPlant(x, y, angle, length) {


    if (length < 10) {

        drawFlower(x, y);

        return;

    }


    const endX = x + Math.cos(angle) * length;

    const endY = y + Math.sin(angle) * length;


    animateLine(
        x,
        y,
        endX,
        endY,
        function () {


            const branches = Math.random() > 0.4 ? 2 : 1;


            for (
                let i = 0;
                i < branches;
                i++
            ) {

                growPlant(
                    endX,
                    endY,
                    angle + (Math.random() - 0.5),
                    length * 0.65
                );

            }

        }

    );

}



function animateLine(
    x1,
    y1,
    x2,
    y2,
    callback
) {

    let progress = 0;


    function draw() {


        progress += 0.02;


        ctx.beginPath();

        ctx.moveTo(x1, y1);

        ctx.lineTo(
            x1 + (x2 - x1) * progress,
            y1 + (y2 - y1) * progress
        );


        ctx.strokeStyle = "#285943";
        ctx.lineWidth = 4;

        ctx.stroke();


        if (progress < 1) {

            requestAnimationFrame(draw);

        }

        else {

            callback();

        }


    }


    draw();

}



function drawFlower(x, y) {


    const colors = [
        "#ff6f91",
        "#ff9671",
        "#ffffff",
        "#d94f70"
    ];


    const color =
        colors[
            Math.floor(
                Math.random() * colors.length
            )
        ];



    ctx.beginPath();

    ctx.arc(
        x,
        y,
        18,
        0,
        Math.PI * 2
    );


    ctx.fillStyle = color;

    ctx.fill();



    ctx.beginPath();

    ctx.arc(
        x,
        y,
        6,
        0,
        Math.PI * 2
    );


    ctx.fillStyle = "#ffd166";

    ctx.fill();

}