let gameSeq =  [];
let userSeq = [];
let highestScore = 0;

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress",function (){
    if(started == false){
        console.log("game is started");
        started = true;


        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    },250);
}


function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //random button choose
    let randIdx = Math.floor(Math.random()*4);
    let randomColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    },250);
}

function checkAns(idx){
    //console.log("current level: ",level);
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp ,1000);
        }
    } else {
        h2.innerHTML = `Game over!Your Score was <b>${level}</b><br>Press any key to Start!`;
        if(highestScore === 0){
            highestScore = level;
        }else{
          if(level > highestScore){
            highestScore = level;
          }  
        }
        let high = document.createElement("h3");
        high.innerText = `HIGHEST SCORE : ${highestScore}`;
        h2.appendChild(high);
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}


let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
