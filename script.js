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



function startGarden() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const plants = 6;


    for (let i = 0; i < plants; i++) {

        growPlant(
            Math.random() * canvas.width,
            canvas.height,
            -Math.PI / 2 + (Math.random() - 0.5) * 0.4,
            120 + Math.random() * 60
        );

    }

}




function growPlant(x, y, angle, length) {


    if (length < 25) {

        drawFlower(x, y);

        return;

    }


    const endX =
        x + Math.cos(angle) * length;


    const endY =
        y + Math.sin(angle) * length;



    animateLine(
        x,
        y,
        endX,
        endY,
        function () {


            // sometimes add a leaf
            if (Math.random() > 0.5) {
                drawLeaf(endX, endY, angle);
            }



            const branches =
                Math.random() > 0.45 ? 2 : 1;



            for (
                let i = 0;
                i < branches;
                i++
            ) {


                growPlant(
                    endX,
                    endY,
                    angle + (Math.random() - 0.5) * 0.5,
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


        progress += 0.025;


        ctx.beginPath();

        ctx.moveTo(
            x1,
            y1
        );


        ctx.lineTo(
            x1 + (x2 - x1) * progress,
            y1 + (y2 - y1) * progress
        );


        ctx.strokeStyle = "#285943";

        ctx.lineWidth = 3;

        ctx.stroke();



        if (progress < 1) {

            requestAnimationFrame(draw);

        } else {

            callback();

        }

    }


    draw();

}




function drawFlower(x, y) {


    const colors = [
        "#ff6b6b", // red
        "#ff8c42", // orange
        "#ffb3c6", // pink
        "#fff5e1"  // white
    ];


    const color =
        colors[
            Math.floor(Math.random() * colors.length)
        ];



    const petals = 5;



    for (let i = 0; i < petals; i++) {


        const angle =
            (Math.PI * 2 / petals) * i;



        const px =
            x + Math.cos(angle) * 9;


        const py =
            y + Math.sin(angle) * 9;



        ctx.beginPath();


        ctx.ellipse(
            px,
            py,
            10,
            18,
            angle,
            0,
            Math.PI * 2
        );


        ctx.fillStyle = color;

        ctx.fill();

    }



    // flower center

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        5,
        0,
        Math.PI * 2
    );


    ctx.fillStyle = "#ffd166";

    ctx.fill();

}




function drawLeaf(x, y, angle) {


    ctx.save();


    ctx.translate(
        x,
        y
    );


    ctx.rotate(angle);



    ctx.beginPath();


    ctx.ellipse(
        0,
        0,
        6,
        14,
        0,
        0,
        Math.PI * 2
    );


    ctx.fillStyle = "#4f8f52";

    ctx.fill();


    ctx.restore();

}