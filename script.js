let canvas=document.getElementById('canvas');
let ctx=canvas.getContext('2d');
let win=document.getElementById('win');
let lose=document.getElementById('lose');
let win_btn=document.getElementById('win_btn');
let lose_btn=document.getElementById('lose_btn');



canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

let speed;
let limit;

let pong1Touch=false;
let number;

let pongWidth=canvas.width/38;
let pongHeight;

let pong1Y=100;      //pong1X and pong1Y
let pong1X=0;
let speedpong1Y;

let pong2X=canvas.width-pongWidth;   //pong2X and pong2Y
let pong2Y=100;

let ballX=canvas.width/2;
let ballY=canvas.height/2;
let ballWidth=canvas.width/30;
let ballHeight=canvas.height/22;
let randomnumber;

function speedAndPong(){
    if(canvas.width>1900 && canvas.width<2400){
        speedpong1Y=20;
        speed=20;
        pongHeight=300;
        limit=100;
       }else if(canvas.width>1500 && canvas.width<1900){
       speedpong1Y=17;
       speed=17;
       pongHeight=250;
       limit=100;
    }else if(canvas.width>=2400){
       speedpong1Y=21;
        speed=21;
        pongHeight=350;
        limit=150;
       }
}
speedAndPong();

let vectorX=-speed;
let vectorY;

function generateVector(){
    randomnumber=Math.floor(Math.random() * 2) + 1;
    if(randomnumber===1){
        vectorY=-speed;
    }else if(randomnumber===2){
        vectorY=speed;
    }
    
}

generateVector();
//drawing the pongs

function deathParams(){
    ballX=canvas.width/2;
    ballY=canvas.height/2;
    speedAndPong()

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
if(ballY+pongHeight-limit<canvas.height && ballY-number>=0 && pong1Touch===true){
    if(pong2Y<ballY-number){
        pong2Y+=speedpong1Y;
    }else if(pong2Y>ballY-number){
        pong2Y-=speedpong1Y;
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

  // if(ballX+2<pong1X+pongWidth && ballY>=pong1Y && ballY<=pong1Y+pongHeight  || ballX+2<pong1X+pongWidth && ballY+ballHeight>=pong1Y && ballY+ballHeight<=pong1Y+pongHeight ){
  //  lose.style.display='flex';
  //  deathParams();
  //    }


 if(ballX+10<pong1X+pongWidth && ballY<pong1Y && ballY+ballHeight>pong1Y || ballX+10<pong1X+pongWidth && ballY<pong1Y+pongHeight && ballY+ballHeight>pong1Y+pongHeight){
    lose.style.display='flex';
   deathParams();
 }

 if(ballX+ballWidth-23>pong2X && ballY+ballHeight>pong2Y && ballY<pong2Y || ballX+ballWidth-23>pong2X && ballY<pong2Y+pongHeight && ballY + ballHeight>pong2Y){
    win.style.display='flex';
    deathParams();
}

    if(ballX<=pong1X+pongWidth && ballY>=pong1Y && ballY<=pong1Y+pongHeight || ballX<pong1X+pongWidth && ballY+ballHeight>pong1Y && ballY+ballHeight<pong1Y+pongHeight)
    {
     vectorX=-vectorX;
    pong1Touch=true;
    number=Math.floor(Math.random() * pongHeight+50);
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
   generateVector();
  win.style.display='none';
})

lose_btn.addEventListener('click',()=>{
    vectorX=-speed;
    generateVector();    
    lose.style.display='none';
  })

animateGame();