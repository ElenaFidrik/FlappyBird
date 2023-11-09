let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

/*let bird = new Image();*/
let bg = new Image(); 
let fg = new Image(); 
let bird = new Image();
let pipeUp = new Image(); 
let pipeBottom = new Image(); 
let sprite = new Image();


let gameOver = false;

bird.src = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.pngimg/bird.png"; 
bg.src = "img/bg.png"; 
fg.src = "img/fg.png"; 
pipeUp.src = "img/pipeNorth.png"; 
pipeBottom.src = "img/pipeSouth.png"; 

// Звуковые файлы
let fly = new Audio();
let score_audio = new Audio();
let die = new Audio();


fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";
die.src = "audio/die.wav";

let gap = 180;

document.addEventListener("keydown", moveUp);
document.addEventListener("click", moveUp);

let restartButton = document.getElementById("btn");
restartButton.addEventListener("click", restart)


function moveUp() {
    yPos -= 65;
    fly.play();
}

let yPos = 150;


let pipe = [];
pipe[0] = {
 x : cvs.width,
 y : 0
}

let score = 0
let bestScore = 0

const SIZE = [51, 36];

let index = 0;

let grav = 0.5;

function draw() {
    requestAnimationFrame(draw)
    
    index += 0.2;

    const birdSource = {
        x: 432,
        y: Math.floor((index % 9) / 3) * SIZE[1],
        width: SIZE[0],
        height: SIZE[1],
    };
    
    const birdResult = {
        x: 50,
        y: yPos,
        width: SIZE[0],
        height: SIZE[1],
    };

    if (gameOver) {
        restartButton.classList.add("active");
        return
    }
    
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(bg, 288, 0);
   
    for(var i = 0; i < pipe.length; i++) {

        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x = pipe[i].x - 0.5;
     
        if(pipe[i].x == 350) {
        pipe.push({
        x : cvs.width,
        y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
        });
    
    }

    // Отслеживание прикосновений
    if(birdResult.x + birdResult.width >= pipe[i].x
    && birdResult.x <= pipe[i].x + pipeUp.width
    && (birdResult.y <= pipe[i].y + pipeUp.height
    || birdResult.y + birdResult.height >= pipe[i].y + pipeUp.height + gap) || birdResult.y + birdResult.height >= cvs.height - fg.height) {
    gameOver = true;
    die.play();
    }
   
    if(pipe[i].x == 5) {
        score++;
        score_audio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(fg, 288, cvs.height - fg.height);
    ctx.drawImage(bird, birdSource.x, birdSource.y, birdSource.width, birdSource.height, birdResult.x, birdResult.y, birdResult.width, birdResult.height);

    yPos += grav;

    ctx.fillStyle = "#fff";
    ctx.font = "24px Abril Fatface";
    ctx.fillText("Score: " + score, 10, cvs.height - 480);
    ctx.fillStyle = "rgb(255, 115, 0)";
    ctx.fillText("Best score: " + score, 420, 490);
}

function restart() {
    location.reload();
}

pipeBottom.onload = draw;