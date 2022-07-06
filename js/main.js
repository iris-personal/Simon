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

const LIT_TIME = 800;

const GAP_TIME = 500;

/*----- app's state (variables) -----*/
let board; // array of 4 elements
let gameStatus; // null -> game in progress, 'L' is loser
let ignoreClick; // ignore clicks while progression plays
let timing; 
let winningSequence; 
let round;
let playerInput;
let iterator;

/*----- cached element references -----*/
// board
const blockEls = [...document.querySelectorAll('#board > div')];

const block1El = document.getElementById('0');
const block2El = document.getElementById('1');
const block3El = document.getElementById('2');
const block4El = document.getElementById('3');
// message
const msgEl = document.getElementById('msg');
// buttons
const startBtn = document.getElementById('start');
const replayBtn = document.getElementById('reset');
// main
const mainEl = document.querySelector('main');



/*----- event listeners -----*/
startBtn.addEventListener('click', handleStartGame);
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
    startBtn;
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



function playWinningSequence() {
    ignoreClick = true;
    let keyIdx = 0;
    //let winSeqIdx = winningSequence[keyIdx];
    const timerId = setInterval(function() {
        const keyEl = blockEls[winningSequence[keyIdx]];
        keyEl.style.backgroundColor = gameSequence[winningSequence[keyIdx]].color;
        gameSequence[winningSequence[keyIdx]].audio.play();
        setTimeout(function() {
            keyEl.style.backgroundColor = 'grey';
        }, LIT_TIME);
        keyIdx++;
        console.log(keyIdx);
        console.log(winningSequence.length);
        if (keyIdx === winningSequence.length) {
            clearInterval(timerId);
            ignoreClick = false;
            
        }

    }, (LIT_TIME + GAP_TIME));
}

function handleStartGame(evt) {
    if (evt.target === startBtn) {
        generateWinningSequence();
        startBtn.style.visibility =  'hidden';
        playWinningSequence();
    }
}


function handleChoice(evt) {
    //guards
    if (evt.target !== replayBtn || ignoreClick) return;
    generateWinningSequence();
    playWinningSequence();
    ignoreClick = true;
    gameStatus = null;
    render();
}


function generateWinningSequence (cb) {
    round++;
    winningSequence.push(Math.floor(Math.random() * gameSequence.length));
    console.log(winningSequence);
}


function handlePlayerInput(event) {
    playerInput.push(parseInt(event.target.id));
    
    // TODO define an event.target.id variable
    if (event.target.tagName === 'DIV') {
        event.target.style.backgroundColor = gameSequence[event.target.id].color;
        gameSequence[event.target.id].audio.play();
        //console.log(event);
        compareSequence(event.target.id);
        setTimeout(function() {
            event.target.style.backgroundColor = 'grey';
        }, 750);
    } 

    //compareSequence(event.target.id);
}


function compareSequence(num) {
    playerInput.forEach(function(arrayEl, idx) {
        // console.log(idx);
        // console.log(winningSequence.length);
        // if (arrayEl !== winningSequence[idx]) {
        //     //console.log('loser');
        //     gameStatus = 'L';
        //     renderMessage; 
        //     render(replayBtn);
        //     ignoreClick = false;
        //     winningSequence = [];
        //     return;
        // } else if (playerInput.length === winningSequence.length) {
        //     gameStatus = null;
        //     generateWinningSequence();
        //     playerInput = [];
        //     playWinningSequence();
        //     //console.log('winner');
        // }
        playWinningSequence();
        generateWinningSequence();
    });
}