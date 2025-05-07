let gameSeq = [];                                       //game sequence 
let playerSeq = [];                                 //player sequence 

let boxes = ["one","two","three","four"];        //array of boxes 

let level = 0;                                              //level variable 
let bestScore = [];
let h3 = document.querySelector("h3");
let h2 = document.querySelector("h2");                     //selecting h2 tag and storing in h2 variable 

let start = false;                              //start variable 

document.addEventListener("keypress",function(){    //event listener for keypress 
    if(start == false){                             //if start is false then start the game 
        console.log("started")                      //log started 
        start = true ;                              //set start to true 
        levelup()                                   //call levelup function 
    }   
});

function levelup(){                                       //levelup function 
    playerSeq = [];                                       //empty player sequence   
    level++;                                             //increment level by 1 
    h2.innerText = `Level ${level}`                     //display level in h2 tag 

    let randIdx = Math.floor(Math.random()*3);                   //generate random number between 0 and 3 and store in randIdx variable 
    let randBox = boxes[randIdx];                               //select box from boxes array and store it in randBox variable 
    console.log(randBox);                                      //log randBox
    let randBtn= document.querySelector(`.${randBox}`);         //select box from document and store it in randBtn and convert string into class name 

    gameSeq.push(randBox);                                  //push box into game sequence 

    console.log(gameSeq);                                   //log game sequence 
    boxFlash(randBtn);                                      //call boxFlash function and pass randBtn as argument 
}

function boxFlash(box){                                //boxFlash function 
    box.classList.add("flash");                       //add flash class to box
    setTimeout(function(){                           //set timeout function 
        box.classList.remove("flash")               //remove flash class from box 
    },250);
}


function userBoxFlash(box){                      //userBoxFlash function 
    box.classList.add("userflash");              //add user flash class to box 
    setTimeout(function(){                      //set timeout function 
        box.classList.remove("userflash")       //remove userflash class from box 
        
    },250);
}

function boxPress(){                         //boxPress function 
    let box = this;                         //select box and store in box variable 
    // console.log(this);                      //log box 
    userBoxFlash(box);                      //call userBoxFlash function and pass box as argument 

    userbox = box.getAttribute("id");    //get id attribute of box and store in userbox variable
    // console.log(userbox);                //log userbox
    playerSeq.push(userbox);            //push userbox into player sequence 

    checkAnswer(playerSeq.length-1);                     //call checkAnswer function
    
}

// function youloseFlash(){                      //userBoxFlash function 
//     box.classList.add("ulose");              //add user flash class to box 
//     setTimeout(function(){                      //set timeout function 
//         box.classList.remove("ulose")       //remove userflash class from box 
        
//     },250);
// }

function checkAnswer(idx){
    if(gameSeq[idx] === playerSeq[idx]){
        console.log(gameSeq,playerSeq);
        if(gameSeq.length === playerSeq.length){
            setTimeout(levelup,1000);
        }
    }else{ 
        h2.innerHTML = `Game over! Your highest scored level is <b>${level}</b> 
        <br> Press any key to restart`;
        bestScore.push(level);
        h3.innerHTML = `Your best score is <b>${Math.max(...bestScore)}</b>`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
        document.querySelector("body").style.backgroundColor = "antiquewhite";},150);
        restart();
    }
    
}         

let allBoxes = document.querySelectorAll(".box");   //select all boxes and store in allBoxes variable 
for(box of allBoxes){                               //for loop for all boxes 
    box.addEventListener("click", boxPress);        //event listener for click on box and call boxPress function 
            
}

function restart(){                                 //restart function
    gameSeq = [];                                   //empty game sequence 
    playerSeq = [];                                 //empty player sequence 
    level = 0;                                      //set level to 0 
    start = false;                                  //set start to false 
}

