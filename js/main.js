/*----- constants -----*/
const COLOR_LOOKUP = {
    1: 'mediumorchid',
    2: 'slateblue',
    3: 'mediumaquamarine',
    4: 'palegreen',
    null: 'grey'
};

const audio1 = new Audio('./audio/audio1.wav');
const audio2 = new Audio('./audio/audio2.wav');
const audio3 = new Audio('./audio/audio3.wav');
const audio4 = new Audio('./audio/audio4.wav');

const AUDIO_LOOKUP = {
    1: `${audio1}`,
    2: `${audio2}`,
    3: `${audio3}`,
    4: `${audio4}`,
} 

// array of objects tracking the sequence created by getting random color and audio 
const gameSequence = [
    {color: 'mediumOrchid', audio: audio1 },    
    {color: 'slateblue', audio: audio2 },    
    {color: 'mediumaquamarine', audio: audio3 },    
    {color: 'palegreen', audio: audio4 },    

];

/*----- app's state (variables) -----*/
let board; // array of 4 elements
let gameStatus; // null -> game in progress, 'L' is loser
let ignoreClick; // ignore clicks while progression plays
let timing; //
let winningSequence; 
let round;
let playerInput;

/*----- cached element references -----*/
const blockEls = [...document.querySelectorAll('#board > div')];

const block1El = document.getElementById('block1');
const block2El = document.getElementById('block2');
const block3El = document.getElementById('block3');
const block4El = document.getElementById('block4');

const msgEl = document.getElementById('msg');

const replayBtn = document.querySelector('button');

const mainEl = document.querySelector('main');

/*----- event listeners -----*/
replayBtn.addEventListener('click', handleChoice);
document.getElementById('board').addEventListener('click', handlePlayerInput);

/*----- functions -----*/
init();

function init() {
    board = [
        null, null, null, null
    ];
    gameStatus = null;
    ignoreClick = false;
    winningSequence = [];
    round = 0;
    generateWinningSequence();
    playerInput = [];
    render();
}

function render() {
    blockEls.forEach(function(blockEl, idx) {
        blockEl.style.backgroundColor = COLOR_LOOKUP[board[idx]];
      });
      renderMessage();
      replayBtn.style.visibility = gameStatus ? 'visible' : 'hidden';
}

function renderMessage() {
    if (gameStatus === null) {
        msgEl.innerHTML = 'Simon says, "follow my lead"!';
      } else  {
        msgEl.innerHTML = 'Too bad... you could NOT keep up!';
      }
}

function handleChoice(evt) {
    //guards
    if (evt.target !== replayBtn || ignoreClick) return;
    ignoreClick = true;
    gameStatus = null;
    render();

}


function generateWinningSequence (cb) {
    winningSequence.push(Math.floor(Math.random() * gameSequence.length));
    console.log(winningSequence);
    // if (gameSequence.length < 50) {
    //     gameSequence.push({}); // 
}

// take playerInput compare to gameSequence array
// if different the player has lost 
function handlePlayerInput(event) {
    playerInput.push(event.target.id);
    
    // TODO define an event.target.id variable
    if (event.target.tagName === 'DIV') {
        event.target.style.backgroundColor = gameSequence[event.target.id].color;
        gameSequence[event.target.id].audio.play();
        //console.log(event);
        event.target.style.backgroundColor = 'grey';
    } 
   if (playerInput.length === winningSequence.length) {
        console.log(playerInput);
        compareSequence(event.target.id);
        generateWinningSequence();
        round++;
        playerInput = [];
   }
    
    //guards
    // if (gameStatus === 'L') {
    //     clearInterval(gameInterval);
    //     ignoreClick = false;
    //     render();
    // }

    // if (event.target !== gameSequence) {
    //     clearInterval(gameInterval);
    //     gameStatus = 'L';
    //     ignoreClick = false; 
    //     render();  
    // }
    
    // render();
};



function compareSequence(num) {
    playerInput.forEach(function(arrayEl, idx) {
        if (arrayEl !== winningSequence) {
            console.log('loser');
            return;
        }
        console.log('winner');
    })
    
    // if (playerInput === winningSequence) {
    //     console.log('true');
    // } else {
    //     console.log('false');
    // }
}