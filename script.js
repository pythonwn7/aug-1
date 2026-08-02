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


const hibiscusColors = [
    "#ff6b35",
    "#ff82cb",
    "#ff4d6d",
    "#fff1dc"
];


let animationStarted = false;
let completedMainBlooms = 0;
let totalBranches = 0;


function resizeCanvas() {
    const pixelRatio =
        Math.min(window.devicePixelRatio || 1, 2);

    canvas.width =
        window.innerWidth * pixelRatio;

    canvas.height =
        window.innerHeight * pixelRatio;

    canvas.style.width =
        `${window.innerWidth}px`;

    canvas.style.height =
        `${window.innerHeight}px`;

    ctx.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
    );
}


resizeCanvas();


window.addEventListener("resize", function () {
    if (!animationStarted) {
        resizeCanvas();
    }
});


startButton.addEventListener("click", function () {
    if (animationStarted) {
        return;
    }

    animationStarted = true;

    openingScreen.classList.add("fade-out");

    setTimeout(function () {
        openingScreen.classList.add("hidden");
        gardenScreen.classList.remove("hidden");

        resizeCanvas();
        startBouquet();
    }, 700);
});


function startBouquet() {
    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    completedMainBlooms = 0;

    const centerX =
        window.innerWidth / 2;

    /*
        Starts slightly below the visible screen so the bouquet
        reaches and disappears naturally into the bottom edge.
    */
    const bottomY =
        window.innerHeight + 14;

    const amount = 13;

    totalBranches = amount;

    const branches = [];

    for (let i = 0; i < amount; i++) {
        const spread =
            (i / (amount - 1)) - 0.5;

        const screenWidth =
            window.innerWidth;

        const maximumSpread =
            Math.min(screenWidth * 0.82, 470);

        const baseCurve =
            spread * maximumSpread;

        const curveVariation =
            (Math.random() - 0.5) * 34;

        const minimumHeight =
            Math.min(window.innerHeight * 0.47, 390);

        const heightVariation =
            Math.min(window.innerHeight * 0.20, 155);

        const branch = {
            curve:
                baseCurve + curveVariation,

            height:
                minimumHeight +
                Math.random() * heightVariation,

            size:
                23 +
                Math.random() * 15,

            color:
                randomHibiscusColor(),

            growthSpeed:
                0.0034 +
                Math.random() * 0.001,

            startDelay:
                0,

            leafPoints:
                createLeafPoints(),

            smallBlooms:
                createSmallBloomPoints()
        };

        branches.push(branch);
    }

    /*
        Shuffle the complete branches so they do not grow
        predictably from left to right.
    */
    shuffleArray(branches);

    for (let i = 0; i < branches.length; i++) {
        branches[i].startDelay =
            i * 260 +
            Math.random() * 500;

        setTimeout(function () {
            growStem(
                centerX,
                bottomY,
                branches[i],
                0
            );
        }, branches[i].startDelay);
    }
}


function growStem(
    startX,
    startY,
    branch,
    progress
) {
    if (progress >= 1) {
        /*
            The flower opens only a fraction of a second
            after its stem reaches the end.
        */
        setTimeout(function () {
            drawHibiscus(
                startX + branch.curve,
                startY - branch.height,
                branch.size,
                branch.color
            );

            completedMainBlooms++;

            if (completedMainBlooms === totalBranches) {
                revealEndingMessage();
            }
        }, 140 + Math.random() * 180);

        return;
    }


    const currentPoint =
        getStemPoint(
            startX,
            startY,
            branch.curve,
            branch.height,
            progress
        );

    const previousProgress =
        Math.max(
            0,
            progress - branch.growthSpeed
        );

    const previousPoint =
        getStemPoint(
            startX,
            startY,
            branch.curve,
            branch.height,
            previousProgress
        );


    /*
        Leaves are drawn before the stem segment so the stem
        remains cleanly visible over them.
    */
    drawScheduledLeaves(
        branch,
        previousProgress,
        progress,
        currentPoint
    );


    drawStem(
        previousPoint.x,
        previousPoint.y,
        currentPoint.x,
        currentPoint.y
    );


    /*
        Small blossoms are drawn after the stem segment,
        keeping them fully above the branch.
    */
    drawScheduledSmallBlooms(
        branch,
        previousProgress,
        progress,
        currentPoint
    );


    requestAnimationFrame(function () {
        growStem(
            startX,
            startY,
            branch,
            progress + branch.growthSpeed
        );
    });
}


function getStemPoint(
    startX,
    startY,
    curve,
    height,
    progress
) {
    /*
        The first part remains near the bouquet base.
        The stem then bends outward more strongly near its top.
    */
    const horizontalMovement =
        curve * (
            0.16 * progress +
            0.84 * Math.pow(progress, 1.55)
        );

    /*
        A subtle wave keeps the stems from looking like
        perfectly mathematical curves.
    */
    const wave =
        Math.sin(progress * Math.PI) *
        Math.sign(curve || 1) *
        7;

    return {
        x:
            startX +
            horizontalMovement +
            wave,

        y:
            startY -
            height * progress
    };
}


function createLeafPoints() {
    const leafCount =
        Math.random() > 0.55 ? 2 : 1;

    const points = [];

    for (let i = 0; i < leafCount; i++) {
        points.push({
            progress:
                0.38 +
                Math.random() * 0.35,

            drawn: false,

            side:
                Math.random() > 0.5 ? 1 : -1
        });
    }

    return points;
}


function createSmallBloomPoints() {
    const bloomCount =
        Math.random() > 0.55 ? 2 : 1;

    const points = [];

    for (let i = 0; i < bloomCount; i++) {
        points.push({
            progress:
                0.71 +
                Math.random() * 0.18,

            drawn: false,

            side:
                Math.random() > 0.5 ? 1 : -1,

            sizeScale:
                0.26 +
                Math.random() * 0.12
        });
    }

    return points;
}


function drawScheduledLeaves(
    branch,
    previousProgress,
    currentProgress,
    point
) {
    for (let i = 0; i < branch.leafPoints.length; i++) {
        const leaf =
            branch.leafPoints[i];

        const reachedPoint =
            previousProgress < leaf.progress &&
            currentProgress >= leaf.progress;

        if (!leaf.drawn && reachedPoint) {
            leaf.drawn = true;

            drawLeaf(
                point.x,
                point.y,
                branch.curve,
                leaf.side
            );
        }
    }
}


function drawScheduledSmallBlooms(
    branch,
    previousProgress,
    currentProgress,
    point
) {
    for (let i = 0; i < branch.smallBlooms.length; i++) {
        const bloom =
            branch.smallBlooms[i];

        const reachedPoint =
            previousProgress < bloom.progress &&
            currentProgress >= bloom.progress;

        if (!bloom.drawn && reachedPoint) {
            bloom.drawn = true;

            const horizontalOffset =
                bloom.side * (
                    branch.size * 0.25 + 7
                );

            const verticalOffset =
                branch.size * 0.32 + 8;

            drawHibiscus(
                point.x + horizontalOffset,
                point.y - verticalOffset,
                branch.size * bloom.sizeScale,
                randomHibiscusColor()
            );
        }
    }
}


function drawStem(
    x1,
    y1,
    x2,
    y2
) {
    ctx.beginPath();

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

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
    curve,
    side
) {
    ctx.save();

    ctx.translate(x, y);

    const baseRotation =
        curve >= 0 ? 0.65 : -0.65;

    ctx.rotate(
        baseRotation * side
    );

    ctx.beginPath();

    ctx.ellipse(
        side * 4,
        -2,
        3.5,
        8,
        0,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#3d8038";

    ctx.globalAlpha =
        0.82;

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

    ctx.translate(x, y);

    ctx.rotate(
        Math.random() *
        Math.PI *
        2
    );

    for (let i = 0; i < 5; i++) {
        ctx.save();

        ctx.rotate(
            i * Math.PI * 2 / 5
        );

        ctx.beginPath();

        ctx.ellipse(
            0,
            -size * 0.55,
            size * 0.42,
            size,
            0,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            color;

        ctx.globalAlpha =
            0.94;

        ctx.fill();

        ctx.restore();
    }

    ctx.globalAlpha = 1;

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        size * 0.23,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#ffd166";

    ctx.fill();

    ctx.restore();
}


function revealEndingMessage() {
    /*
        A brief pause lets the final bloom settle before
        the title appears.
    */
    setTimeout(function () {
        message.classList.remove("hidden");
        message.classList.add("show");
    }, 650);
}


function randomHibiscusColor() {
    const index =
        Math.floor(
            Math.random() *
            hibiscusColors.length
        );

    return hibiscusColors[index];
}


function shuffleArray(array) {
    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {
        const randomIndex =
            Math.floor(
                Math.random() * (i + 1)
            );

        const temporaryValue =
            array[i];

        array[i] =
            array[randomIndex];

        array[randomIndex] =
            temporaryValue;
    }
}