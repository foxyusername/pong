let canvas=document.getElementById('canvas');
let ctx=canvas.getContext('2d');
let win=document.getElementById('win');
let lose=document.getElementById('lose');
let win_btn=document.getElementById('win_btn');
let lose_btn=document.getElementById('lose_btn');



canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

let speed;

speed=9;

let pong1Touch=false;
let number;

let pongWidth=canvas.width/38;
let pongHeight=250;

let pong1Y=100;      //pong1X and pong1Y
let pong1X=0;
let speedpong1Y=10;

let pong2X=canvas.width-pongWidth;   //pong2X and pong2Y
let pong2Y=100;

let ballX=canvas.width/2;
let ballY=canvas.height/2;
let ballWidth=canvas.width/30;
let ballHeight=canvas.height/22;
let vectorX=-speed;
let vectorY=-speed;

//drawing the pongs

function deathParams(){
    ballX=canvas.width/2;
    ballY=canvas.height/2;
    speed=9;

    vectorX=0;
    vectorY=0;

    pong1Touch=false;
    pong1X=0;
    pong1Y=100;
    pong2X=canvas.width-pongWidth;
    pong2Y=100;
}

function drawPong1(){
   ctx.fillStyle='red';
  ctx.fillRect(pong1X,pong1Y,pongWidth,pongHeight);
}

function drawPong2(){
    ctx.fillStyle='red';
    ctx.fillRect(pong2X,pong2Y,pongWidth,pongHeight);
}


function automatePong(){
if(ballY+pongHeight-100<canvas.height && ballY-number>=0 && pong1Touch===true){
    if(pong2Y<ballY-number){
        pong2Y+=8;
    }else if(pong2Y>ballY-number){
        pong2Y-=8;
    }else if(pong2Y===ballY-number){
     pong2Y=ballY-number;
    }
}
    drawPong2();
}

//drawing the ball

function drawBall(){
    ctx.fillStyle='white';
    ctx.fillRect(ballX,ballY,ballWidth,ballHeight);
}

//moving the ball

function moveBall(){
    ballX+=vectorX;
    ballY+=vectorY;
    if(ballY<=0 || ballY+ballHeight>=canvas.height){
     vectorY=-vectorY;
    }
    if(ballX + ballWidth>=canvas.width){
        win.style.display='flex';
       deathParams();
    }
    if(ballX<=0){
       lose.style.display='flex';
        deathParams();
    }

   if(ballX+2<pong1X+pongWidth && ballY>=pong1Y && ballY<=pong1Y+pongHeight || ballX+2<pong1X+pongWidth && ballY+ballHeight>=pong1Y && ballY+ballHeight<=pong1Y+pongHeight ){
        alert('you died from heart attack');
        deathParams();
      }



    if(ballX<=pong1X+pongWidth && ballY>=pong1Y && ballY<=pong1Y+pongHeight || ballX<pong1X+pongWidth && ballY+ballHeight>pong1Y && ballY+ballHeight<pong1Y+pongHeight)
    {
     vectorX=-vectorX;
    pong1Touch=true;
    number=Math.floor(Math.random() * 300);
    }


    if(ballX+ballWidth>pong2X && ballY>pong2Y && ballY<pong2Y+pongHeight){
        vectorX=-vectorX;
     pong1Touch=false;
    }


    drawBall();
}


//animating game

function animateGame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawPong1();
   automatePong();
    moveBall();
    requestAnimationFrame(animateGame);
}

//Eventlistener for first pong movement

window.addEventListener('keydown',(e)=>{
    if(e.key==="s" && pong1Y+pongHeight<canvas.height || e.key==="ArrowDown" && pong1Y+pongHeight<canvas.height){
      pong1Y+=speedpong1Y;
    }else if(e.key==='w' && pong1Y>0 || e.key==='ArrowUp' && pong1Y>0){
      pong1Y-=speedpong1Y;
    }
})

win_btn.addEventListener('click',()=>{
  vectorX=-speed;
  vectorY=-speed;
  win.style.display='none';
})

lose_btn.addEventListener('click',()=>{
    vectorX=-speed;
    vectorY=-speed;
    lose.style.display='none';
  })

animateGame();