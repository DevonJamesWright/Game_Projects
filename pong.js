var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 5;
var ballSpeedY = 5;

var player1score = 0
var player2score = 0
const WINNING_SCORE = 6;

var showingWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}
function handleMouseClick(evt){
    if (showingWinScreen) {
        player1score = 0;
        player2score = 0;
        showingWinScreen = false;
    }
}


window.onload = function(){
console.log(ballX);
canvas = document.getElementById('gameCanvas');
canvasContext = canvas.getContext('2d');
var framesPerSecond = 30;
setInterval(function(){
    console.log(ballX)
    moveEverything();
    drawEverything();
}, 1000/framesPerSecond);

canvas.addEventListener('mousemove',
    function(evt) {
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
});
canvas.addEventListener('mousedown',handleMouseClick);
}

function ballReset(){
    if(player1score >= WINNING_SCORE ||
        player2score >= WINNING_SCORE) {
            if (player1score >= WINNING_SCORE){
                alert("Congratulations!");
                showingWinScreen = true; }
                 if (player2score >= WINNING_SCORE){
                    alert("Better luck next time!");
                    showingWinScreen = true;
                 }
            
            
        }
        
     ballSpeedX = -ballSpeedX
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}
function computerMovement(){
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2)
    if (paddle2YCenter < ballY - 35) {
        paddle2Y += 10;
    }
    else if (paddle2YCenter > ballY + 35){
        paddle2Y -= 10;
    }
}


function moveEverything(){
    if(showingWinScreen) {
        return;
    }
    computerMovement();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if(ballX > canvas.width){
        if (ballY > paddle2Y &&
        ballY < paddle2Y+PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX
            var deltaY = ballY
                    -(paddle2Y+PADDLE_HEIGHT/2);
                    ballSpeedY = deltaY * 0.35;
        }
        else{
            player1score ++;
            ballReset();
    
        };
    }
    if (ballX < 0){
       
        if (ballY > paddle1Y &&
            ballY < paddle1Y+PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX
                
                var deltaY = ballY
                    -(paddle1Y+PADDLE_HEIGHT/2);
                    ballSpeedY = deltaY * 0.35;
            }
            else{
                player2score ++;
                ballReset();
            }
    }
    
    if(ballY > canvas.height){
        ballSpeedY = -ballSpeedY
    }
    if(ballY < 0){
        ballSpeedY = -ballSpeedY
    }
}

function drawEverything(){
    if(showingWinScreen) {
        canvasContext.fillstyle = "red"
        canvasContext.fillText("Click to continue",200,100);
        return;
    }
    
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    //ball
    canvasContext.fillStyle = "red";
    canvasContext.beginPath();
    canvasContext.arc(ballX,ballY,10,0,Math.PI*2, true);
    canvasContext.fill();
    // net
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(400,5,10,canvas.height - 8);
    //player paddle
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT);
    //ai paddle
    canvasContext.fillStyle = "blue";
    canvasContext.fillRect(canvas.width - PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT);

    canvasContext.fillStyle = "white";
    canvasContext.fillText(player1score,100,100);
    canvasContext.fillText(player2score,canvas.width - 100,100);

    
}
